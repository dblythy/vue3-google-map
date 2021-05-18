# Marker

Use the `Marker` component to draw markers, drop pins or any custom icons on a map.

## Options

You can pass a [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) object to the `options` prop to configure your marker.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
    width: "100%"
    height: "500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 }
    const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }

    return { center, markerOptions }
  },
})
</script>
```

\
<GoogleMap width="100%" height="400px" :center="{ lat: 40.689247, lng: -74.044502 }" :zoom="15">
<Marker :options="{ position: { lat: 40.689247, lng: -74.044502 }, label: 'L', title: 'LADY LIBERTY' }" />
</GoogleMap>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.animation_changed) on the `Marker` component.
