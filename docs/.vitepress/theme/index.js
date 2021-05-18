import theme from "vitepress/dist/client/theme-default";
import * as libraryComponents from "/@src/components/index";
import * as examples from "/@docs/examples/index";
import { h } from "vue";

export default {
  ...theme,
  enhanceApp({ app, router, siteData }) {
    // config({ path: "../.env" });
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.

    const { GoogleMap, ...libraryComponentsRest } = libraryComponents;

    app.component("GoogleMap", {
      render() {
        // @ts-ignore
        return h(GoogleMap, {}, this.$slots.default);
      },
    });

    for (const key in libraryComponentsRest) {
      app.component(key, libraryComponents[key]);
    }

    for (const key in examples) {
      app.component(key, {
        render() {
          // @ts-ignore
          return h(examples[key], {});
        },
      });
    }
  },
};
