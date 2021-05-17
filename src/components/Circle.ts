import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { ICircleOptions } from "../@types/index";
import { CIRCLE_EVENTS } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ICircleOptions>,
      required: true,
    },
  },
  emits: CIRCLE_EVENTS,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const circle = useSetupMapComponent("Circle", CIRCLE_EVENTS, options, emit);

    return { circle };
  },
  render: () => null,
});
