---
sidebar: auto
---
# Configuring Maps

## API Config versus Map Config

The first distinction we want to make regarding configuration is between what we'll call _API config_ and _Map Config_.

1. **API Config** - there are a number of underling configuration parameters (such as API Key, libraries, etc.) which get configured as soon as Google's underlying Maps API is loaded. These parameters, once set are immutable.
2. **Map Config** - when a map is actually drawn, it uses the above API to instantiate a Map instance and this map then has a set of options or configuration. This can be changed throughout the life of the map and this repo ensures that they are reactive and responding to changes.

This distinction is important but can be a bit subtle when you see examples such as this:

```html
<GoogleMap />
```

In fact, this code actually does all of the following:

1. Checks to see if the globally Google API is installed and if not, loads it asynchronously (using the default API configuration)
2. Instantiates a GoogleMap and paints it to the screen (using the default Map configuration)

In the next two sections we'll go over how to move beyond the default configurations.

## API Config

The API configuration can be set one of two ways:

1. **ENV variables** - many of the configuration options can be setup purely with ENV variables
2. **`api` parameter** - you may also use the `api` parameter on the `GoogleMaps` component to have fine grained control over the API configuration

### Using ENV variables

The one crucial configuration element you'll almost sure _need_ is your API Key. So long as the `VITE_MAP_API_KEY` variable or `VUE_APP_MAP_API_KEY` is set then this will be used. This same pattern is repeated for a few of the more common configuration options:

- Libraries: `VITE_MAP_LIBRARIES` _or_ `VUE_APP_MAP_LIBRARIES`
- Language: `VITE_MAP_LANGUAGE` _or_ `VUE_APP_MAP_LANGUAGE`
- Region: `VITE_MAP_REGION` _or_ `VUE_APP_GOOGLE_REGION`

### Using the `api` Parameter

Instead of using the ENV variables, you can also use the `api` parameter on `GoogleMap`. This exposes the entire API surface which the npm library [`@googlemaps/js-api-loader`](https://github.com/googlemaps/js-api-loader) exposes and this should be strongly typed if you're using a plugin like Volar for your Vue development.

### Using Both

Finally, if you set ENV variables this will serve as a baseline configuration and anything you put into the `api` parameter will override that but the ENV baseline is still used if no value for a given property is set in the `api` configuration object.

## Map Config

At the root, every use of this repo starts with `GoogleMap` but within the _slot scope_ of this component you can use any number of the other components covered in the [components](../components/index.md) section. While each component has it's specific focus and therefore different API surface, we take a structurally similar philosophy toward how to present the API surface of each of these.

### The `config` Parameter

Each of the components exposes a `config` parameter which exposes _all_ of the options which the underlying Google API provides. This parameter is strongly typed and you can change it during runtime and expect for it to be reactive.

As a _for instance_, the `GoogleMap` component exposes the `IMap` API surface on the `config` property it exposes and it allows you to state things like:

```html
<GoogleMap :config="{ zoom: 5, rotateControl: true }" />
```

or from within a SFC:

```vue
<template>
  <GoogleMap :config="{ zoom: 5, rotateControl: true }" />
</template>
<script lang="ts">
    export default defineComponent({
        import { GoogleMap, IMapOptions } from "vue3-google-map";
        setup() {
            const config: IMapOptions = { zoom: 5, rotateControl: true }; 
            return { config };
        }
    });
</script>
```

> The underlying Google API exposes a type called `google.maps.MapOptions` which this repo proxies through to anyone who wants to use the type as `IMapOptions`.

### Core API

Beyond just the `config` parameter, however, we identify core aspects of the API and make this available on the root of the component. Sometimes this just means us proxying properties through from the `config` but other times we may try to make improvements to the funtionality. Let's give two example of this using the `GoogleMap` component:

#### Example 1: Zoom Level

In the previous `config` example we showed how you can state the `zoom` property as a property on _config_. You can do this but setting the zoom level is a very common operation and so this has been pulled out to be part of the core API. This means that you can simply state the following:

```html
<GoogleMap zoom="5" />
```

Doing this doesn't in any way prevent you from later doing it as part of the config object but the core API will always take precedence over the general config hash. Now are the two `zoom` configurations exactly the same? Very close but with the core API we allow you to state both a _number_ (which is what `config.zoom` is typed to) or a string representation of a number. Small change but it makes for using a static value like the example above that much easier.

#### Example #2: Themes
In the `config` parameter you can set a property called `styles` and this will effect the way that your map is displayed. From a _typing_ standpoint this property is an array of `IMapTypeStyle` elements. You can therefore style your map with just this **config.styles** setting but we expose a core property called `theme` which is covered in greater detail in the [themes](../themes/index.md) section but in short it allows for you to more compactly style your map with either built-in styles or your own:

```html
<!-- using a built-in style -->
<GoogleMap theme="dark" />
<!-- load asynchronously from a URL -->
<GoogleMap theme="https://my-site.com/theme/dark.json" />
<!-- pass in an appropriately typed object -->
<GoogleMap :theme="myTheme" />
```
