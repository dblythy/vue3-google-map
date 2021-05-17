import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { IRectangleOptions } from "../@types/index";
import { RECTANGLE_EVENTS } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IRectangleOptions>,
      required: true,
    },
  },
  emits: RECTANGLE_EVENTS,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const rectangle = useSetupMapComponent("Rectangle", RECTANGLE_EVENTS, options, emit);

    return { rectangle };
  },
  render: () => null,
});
