import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { IPolylineOptions } from "../@types/index";
import { POLYLINE_EVENTS } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolylineOptions>,
      required: true,
    },
  },
  emits: POLYLINE_EVENTS,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const polyline = useSetupMapComponent("Polyline", POLYLINE_EVENTS, options, emit);

    return { polyline };
  },
  render: () => null,
});
