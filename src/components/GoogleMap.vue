<template>
  <div class="map-container" :style="wrapperStyle" v-bind="$attrs">
    <div ref="mapElement" class="map" style="width: 100%; height: 100%" />
    <slot />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-undef */
import {
  defineComponent,
  PropType,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  provide,
  computed,
  reactive,
  Ref,
} from "vue";
import { LoaderOptions } from "@googlemaps/js-api-loader";
import { IGoogleMapsAPI, IMap, IMapOptions, AspectRatio, Api, MapTheme, ZoomLevel } from "../@types/index";
import { MAP_SYMBOL, API_SYMBOL, MAP_EVENTS, getEnv } from "../shared/index";
import { loadApi } from "./GoogleMap/loadApi";
import { MapError } from "../errors";
import { loadTheme } from "./GoogleMap/loadTheme";
import { loadApiConfigFromEnv } from "./GoogleMap/loadApiConfigFromEnv";

function computeHeight(w: string | undefined, ratio: AspectRatio) {
  if (ratio) {
    const [wR, lR] = ratio?.split(":").map((i) => Number(i));
    const r = lR / wR;
    if (w && w.slice(-2) === "px") {
      const width = Number(w.slice(0, -2));
      const height = width * r;
      return `${height}px`;
    } else {
      throw new MapError(
        "Currently you can only use aspect ratio when you explicitly set the width in pixels. This may be improved in the future. ",
        "aspect-ratio/feature-incomplete"
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
      type: [Number, String] as PropType<ZoomLevel>,
      default: 15,
    },

    tilt: {
      type: Number,
      required: false,
      default: undefined,
    },

    theme: {
      type: [String, Array] as PropType<MapTheme>,
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
  emits: MAP_EVENTS,
  setup(props, { emit, attrs }) {
    const mapElement = ref<HTMLElement | null>(null);
    const ready = ref(false);
    const map = ref<IMap | null>(null);
    const googleApi = ref<IGoogleMapsAPI | null>(null);

    const envConfig = loadApiConfigFromEnv();
    /**
     * Assemble the Google API's configuration; leveraging
     * passed in explicit values as well as ENV variables
     * if available.
     */
    const apiConfig: LoaderOptions =
      typeof props.api === "string"
        ? {
            ...envConfig,
            apiKey: props.api || envConfig.apiKey,
          }
        : props.api
        ? { ...envConfig, ...props.api }
        : envConfig;

    /**
     * The map config is reactive object which defines all the properties
     * allowed on Google's Map API
     */
    const mapOptions: IMapOptions = reactive({
      ...(props.options ? props.options : {}),
      ...(props.zoom ? { zoom: Number(props.zoom) } : {}),
      ...(props.tilt ? { tilt: props.tilt } : {}),
      ...(props.center ? { center: props.center } : {}),
    });

    provide(MAP_SYMBOL, map);
    provide(API_SYMBOL, googleApi);

    onBeforeUnmount(() => {
      if (map.value) {
        googleApi.value?.event.clearInstanceListeners(map.value);
      }
    });

    onMounted(async () => {
      if (window.google && window.google.maps.Map) {
        if (getEnv().DEV) {
          console.info("found google API, reusing established connection");
        }
        /** get reference to existing Map API */
        map.value = new google.maps.Map(mapElement.value as HTMLElement, mapOptions);
      } else {
        /** establish new instance of Map API */
        map.value = await loadApi(apiConfig, mapElement as Ref<HTMLElement>, mapOptions);
      }
      if (props.theme) {
        loadTheme(props.theme, map as Ref<IMap>);
      }

      MAP_EVENTS.forEach((event) => {
        // TODO: investigate this depracation
        map.value?.addListener(event, (e: unknown) => emit(event, e));
      });
      ready.value = true;
      watch(
        [() => props.center, () => props.zoom, () => props.theme, () => props.tilt, () => props.options] as const,
        ([center, zoom, theme, tilt, options], [oldCenter, oldZoom, oldTheme, oldTilt, oldOptions]) => {
          if (map.value && zoom !== undefined && zoom !== oldZoom) {
            map.value.setZoom(Number(zoom));
          }

          if (oldTheme !== theme && googleApi.value && map.value) {
            loadTheme(theme, map as Ref<IMap>);
          }

          if (center && map.value) {
            if (!oldCenter || center.lng !== oldCenter.lng || center.lat !== oldCenter.lat) {
              map.value.panTo(center);
            }
          }

          if (map.value && tilt && tilt !== oldTilt) {
            map.value.setTilt(tilt);
          }

          if (map.value && options !== oldOptions) {
            if (getEnv().DEV) {
              console.log("Map config has changed");
            }
            map.value.setOptions(options);
          }
        }
      );
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

    const wrapperStyle = computed<string>(() => {
      return attrs.style
        ? (attrs.style as string)
        : `width: ${width.value}; height: ${height.value}; min-height: ${minHeight.value}`;
    });

    return { mapElement, ready, map, googleApi, wrapperStyle, mapOptions };
  },
});
</script>
