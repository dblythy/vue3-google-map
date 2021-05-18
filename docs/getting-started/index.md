---
sidebar: auto
---
# Getting Started

## Functional Overview

`vue3-google-map` is a set of [_composable_ components](../components/) intended to make adding [Google Maps](https://developers.google.com/maps/documentation/javascript/overview) to your Vue 3 projects a snap.

We're going to use two components in our first component:

- The `GoogleMap` component will draw the map for us, and
- we'll also add a _marker_ on the map with the `Marker` component

This combination will start to give you a sense of not only how to place a map onto your application but also how you might _compose_ more complicated layouts with components like
`Marker` which sit inside your map.

## Our First Map

### Code

For this let's use Vue's SFC style component. Our example uses Typescript syntax but in this case a Javascript version of this code would be nearly identical and we're just opting for TS because we want to illustrate that this is intended to be fully Typescript-ready.

<!-- prettier-ignore -->
```vue
<template>
  <div style="width: 100%; height: 400px">
    <GoogleMap :api="apiKey">
      <Marker :options="markerOptions" />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    /** make sure you provide your API key to the component **/
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    /** center the marker in the middle of the map */
    const marker = { center: { lat: 40.689247, lng: -74.044502 }};

    return { apiKey, center }
  },
})
</script>
```

### The Map

<div style="width: 100%; height: 400px; margin-top: 1rem">
   <GoogleMap :center="{ lat: 40.689247, lng: -74.044502 }" :zoom="15" >
     <Marker :options="{ position: { lat: 40.689247, lng: -74.044502 } }" />
   </GoogleMap>
</div>

### Observations

Below you will see how this code translates into an actual map but let's review a few key take aways of the code sample:

1. The `GoogleMap` component is the key starting point for all maps, but it may contain zero or more _interior_ components which will be displayed on the map. 

   > In our example this is just the `Marker` component but in the [Components](../components/) section we'll go over the other components which are available.

   > This ability to _compose_ what you want drawn is a much more powerful strategy than just trying to fit all nearly infinite things you might want to do into the props of the root component.

2. The only **required** parameter to a `GoogleMap` component is the API key
   
    > You _could_ use this component without it but unfortunately Google wants your credit card details so you'll get the ugly warning message you're seeing below in the our example (yes, we're too cheap to add a key). 
    > Note: you will need an API key but you will also need to make sure you've enabled the API for [billing](https://console.cloud.google.com/project/_/billing/enable).

3. In the **Marker** you see us using the _options_ parameter to set the location of the marker.

    > This example -- like many examples added to the "getting started" section of documentation -- is intended to be easy to digest rather than show the full power of the feature. In fact, if you hadn't stated that option, the centered position would have actually been the default. But importantly, every component in this library exposes an `options` hash which provides a way to reach into that component and utilize the rather expansive set of options that Google provides.

    > We will cover the use of options in the next section, entitled ... you guessed it ... the [Option](../config/) section.
  
4. In the template section you'll see that we wrapped the map in a **div** with explicit _height_ and _width_. 

    > By default the `GoogleMap` component uses space eagerly, meaning it will consume the entire _height_ and _width_ available to the section of the DOM where it is placed. This is often what you want, as it will just "fit" into the part of the page you put it. This also tends to work well with your _responsive design_ if you're into that sort of stuff.

    > If you want to change this you can set the `height`, `width`, and `aspectRatio` properties to get the effect you prefer. So had we wanted to we could have skipped the surrounding `<div>` and just stated the height and width on the `GoogleMap` itself. 

> **Note:** currently `aspectRatio` only works when you explicitly state the width in pixels; this may be improved in a future version. 


