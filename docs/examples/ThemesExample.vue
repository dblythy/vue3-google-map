<template>
  <GoogleMap :center="center" :theme="theme" :zoom="4" width="100%" height="400px" />
  <label for="theme">Theme</label>
  <select v-model="theme" id="theme">
    <option value="">-- None --</option>
    <option v-for="theme in themes" :value="theme" :key="theme">{{ theme }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { MapTheme } from "/@src/@types";
import { GoogleMap } from "/@src/components/index";
import { THEMES } from "/@src/shared";

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const center = { lat: 39.50024, lng: -98.350891 };
    const theme = ref<null | MapTheme>(null);

    return { center, themes: THEMES, theme };
  },
});
</script>

<style scoped>
select {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
