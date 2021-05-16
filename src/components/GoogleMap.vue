<template>
  <div class="map-container" :style="wrapperStyle">
    <div v-bind="$attrs" ref="mapRef" class="map" style="width: 100%; height: 100%" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, watch, provide, computed, reactive } from "vue";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { IGoogleMapsAPI, IMap, IMapOptions, AspectRatio, Api, MapTheme, IMapTypeStyle } from "../@types/index";
import { mapSymbol, apiSymbol, loaderInstance, mapEvents } from "../shared/index";
import * as themes from "../themes";

function computeHeight(w: string | undefined, ratio: AspectRatio) {
  if (ratio) {
    const [wR, lR] = ratio?.split(":").map((i) => Number(i));
    const r = lR / wR;
    if (w && w.slice(-2) === "px") {
      const width = Number(w.slice(0, -2));
      const height = width * r;
      return `${height}px`;
    } else {
      throw new Error(
        "Currently you can only use aspect ratio when you explicitly set the width in pixels. This may be improved in the future. "
      );
    }
  }
}

export default defineComponent({
  props: {
    height: {
      type: String,
      default: undefined,
      required: false,
    },
    minHeight: {
      type: String,
      default: undefined,
      required: false,
    },
    width: {
      type: String,
      default: undefined,
      required: false,
    },
    aspectRatio: {
      type: String as PropType<AspectRatio>,
      default: undefined,
      required: false,
    },
    style: {
      type: String,
      default: undefined,
      required: false,
    },
    api: {
      type: [String, Object] as PropType<Api>,
      default: "",
    },
    options: {
      type: Object as PropType<Partial<IMapOptions>>,
      required: false,
      default: undefined,
    },

    center: {
      type: Object as PropType<IMapOptions["center"]>,
      required: false,
      default: undefined,
    },

    zoom: {
      type: Number,
      default: 15,
    },

    tilt: {
      type: Number,
      required: false,
      default: undefined,
    },

    theme: {
      type: String as PropType<MapTheme>,
      required: false,
      default: undefined,
    },

    // fullscreenControl: { type: Boolean, default: undefined },
    // fullscreenControlPosition: String as PropType<IControlPosition>,
    // gestureHandling: String as PropType<"cooperative" | "greedy" | "none" | "auto">,
    // heading: Number,
    // keyboardShortcuts: { type: Boolean, default: undefined },
    // mapTypeControl: { type: Boolean, default: undefined },
    // mapTypeControlOptions: Object as PropType<IMapTypeControlOptions>,
    // mapTypeId: {
    //   type: [Number, String] as PropType<IMapTypeId | string>,
    // },
    // maxZoom: Number,
    // minZoom: Number,
    // noClear: { type: Boolean, default: undefined },
    // panControl: { type: Boolean, default: undefined },
    // panControlPosition: String as PropType<IControlPosition>,
    // restriction: Object as PropType<IMapRestriction>,
    // rotateControl: { type: Boolean, default: undefined },
    // rotateControlPosition: String as PropType<IControlPosition>,
    // scaleControl: { type: Boolean, default: undefined },
    // scaleControlStyle: Number as PropType<IScaleControlStyle>,
    // scrollwheel: { type: Boolean, default: undefined },
    // streetView: Object as PropType<IStreetViewPanorama>,
    // streetViewControl: { type: Boolean, default: undefined },
    // streetViewControlPosition: String as PropType<IControlPosition>,
    // styles: Array as PropType<IMapTypeStyle[]>,
    // tilt: Number,
    // zoom: Number,
    // zoomControl: { type: Boolean, default: undefined },
    // zoomControlPosition: String as PropType<IControlPosition>,
  },
  emits: mapEvents,
  setup(props, { emit }) {
    const mapRef = ref<HTMLElement | null>(null);
    const ready = ref(false);
    const map = ref<IMap | null>(null);
    const apiRef = ref<IGoogleMapsAPI | null>(null);

    const options: IMapOptions = reactive({
      ...(props.options ? props.options : {}),
      ...(props.theme ? { styles: themes[props.theme as keyof typeof themes] } : {}),
      ...(props.zoom ? { zoom: props.zoom } : {}),
      ...(props.tilt ? { tilt: props.tilt } : {}),
      ...(props.center ? { center: props.center } : {}),
    });

    provide(mapSymbol, map);
    provide(apiSymbol, apiRef);

    onBeforeUnmount(() => {
      if (map.value) {
        apiRef.value?.event.clearInstanceListeners(map.value);
      }
    });

    onMounted(async () => {
      try {
        const apiConfig: LoaderOptions =
          typeof props.api === "string"
            ? { apiKey: props.api, libraries: ["places"] }
            : props.api
            ? props.api
            : { apiKey: "" };

        loaderInstance.value = new Loader(apiConfig);
      } catch (err) {
        // Loader instantiated again with different options, which isn't allowed by js-api-loader
        console.error(err);
      } finally {
        (loaderInstance.value as Loader).load().then(() => {
          // eslint-disable-next-line no-undef
          const { Map } = (apiRef.value = google.maps);
          map.value = new Map(mapRef.value as HTMLElement, options);

          mapEvents.forEach((event) => {
            map.value?.addListener(event, (e: unknown) => emit(event, e));
          });

          ready.value = true;

          // const otherPropsAsRefs = (Object.keys(props) as (keyof typeof props)[])
          //   .filter((key) => !["center", "zoom"].includes(key))
          //   .map((key) => toRef(props, key));

          watch(
            [() => props.center, () => props.zoom, () => props.theme] as const,
            ([center, zoom, theme], [oldCenter, oldZoom, oldTheme]) => {
              if (zoom !== undefined && zoom !== oldZoom) {
                map.value?.setZoom(zoom);
              }

              if (oldTheme !== theme && apiRef.value && map.value) {
                console.log("restyling");

                const styles = themes[theme as keyof typeof themes] as IMapTypeStyle[];
                // map.value.mapTypes.set(theme, new apiRef.value.StyledMapType(themes[theme as keyof typeof themes]));
                // map.value.setMapTypeId(theme);
                options.styles = styles;
                map.value.setOptions({ styles });
              }

              if (center && map.value) {
                if (!oldCenter || center.lng !== oldCenter.lng || center.lat !== oldCenter.lat) {
                  map.value.panTo(center);
                }
              }
            }
          );
        });
      }
    });

    const width = computed(() => {
      return props.width || "100%";
    });

    const height = computed(() => {
      return props.aspectRatio ? computeHeight(width.value, props.aspectRatio) : props.height || "100%";
    });

    const minHeight = computed(() => {
      return props.minHeight ? props.minHeight : "100px";
    });

    const wrapperStyle = computed(() => {
      return props.style
        ? props.style
        : `width: ${width.value}; height: ${height.value}; min-height: ${minHeight.value}`;
    });

    return { mapRef, ready, map, apiRef, wrapperStyle, config: options };
  },
});
</script>
