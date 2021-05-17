import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { IPolygonOptions } from "../@types/index";
import { POLYGON_EVENTS } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolygonOptions>,
      required: true,
    },
  },
  emits: POLYGON_EVENTS,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const polygon = useSetupMapComponent("Polygon", POLYGON_EVENTS, options, emit);

    return { polygon };
  },
  render: () => null,
});
