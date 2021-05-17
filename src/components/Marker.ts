import { defineComponent, PropType, Ref, toRef } from "vue";
import { IComponentOptions, useSetupMapComponent } from "../composables/index";
import { IMarkerOptions } from "../@types/index";
import { MARKER_EVENTS } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IMarkerOptions>,
      required: true,
    },
  },
  emits: MARKER_EVENTS,
  setup(props, { emit }) {
    const options = toRef(props, "options") as Ref<IComponentOptions>;
    const marker = useSetupMapComponent("Marker", MARKER_EVENTS, options, emit);

    return { marker };
  },
  render: () => null,
});
