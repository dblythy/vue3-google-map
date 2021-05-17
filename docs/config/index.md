---
sidebar: auto
---
# Parameters, Options, and underlying APIs

## Intro

This library intends to offer you _every_ feature/option -- for the components which we support -- that the Google Maps API provides and this section is mainly meant as a way to understand how you can reach into that optionality.

## The Options API

### What it is Not

Now we all know that "naming is hard" so let us first clarify that what we are _not_ referring to is the VueJS Options API (aka, the API which preceeded the Composition API). 

### What it Is
Ok so what we _actually_ mean by Options API is that every component that this repo exports has an _options_ property.
The `options` property in each component maps directly to the API which Google exposes for that component. So for instance, if a Google Map has a configuration element called "center" (it _does_ by the way), then you can configure that with:

```html
<GoogleMap :options="{  }" />
```

## The Underlying Google API

Critical to this repo's _utility_ is that you have loaded the Google JS API first. This API should really only be loaded once per "application". In this case "application" could just mean the tab you're running in but it might also mean multiple tabs depending on how _fancy_ you are.

The underlying API can be found as an **npm** dependency listed as [`@googlemaps/js-api-loader`](https://googlemaps.github.io/js-api-loader/index.html). When you install this repo, we will express this library as a "peer dependency" which means that whether you use _yarn_, _npm_, or _pnpm_ it will install this dependency into your applications node_modules directory.

How much should you care about this? Well it depends. In general, it's probably good to know about but if you want the fastest path to map glory, you can ignore this and just read the next section with general warm feeling that _there is_ an API that Google made but _you don't have to care about it_.

### Just Do It (for me)

So if you just want us to do everything for you this is the section for you. In fact, at the most basic level, just ignore it altogether. You just create a `GoogleMap` component and we'll load the underlying JS API for you.

However, the first stumbling block you may hit is that there are a some configuration options which can only be stated when we initialize the API. Our defaults are intended to be reasonable but we do give you access to all of them. These include:

- `apiKey` - as it says on the tin; no free lunches from Google
- [`libraries`](https://developers.google.com/maps/documentation/javascript/libraries) - by default we'll load the _places_ library
- `language` - the language Google should use on the maps, default is "en-us"
- `region` - the regional settings Google should use

Once you start needing to move away from the default configuration you will use the `api` parameter instead of the `apiKey` parameter like so:

```html
<GoogleMap 
    :api="{ apiKey: 'my-big-secret', libraries: ['places', 'localContext] }" 
/>
```
> If you want more details you can refer to: [Details on loading Google API](details-on-google-api)

### No Thanks, I'll do it Myself

There might be some edge cases where you just want to load the underlying API yourself and then let us know where it is. That's fine too and can be achieved with the `loadFrom` parameter:

```html
<GoogleMap loadFrom="myProp" />
```

> **Note:** because you have loaded Google's API yourself there is no need for you to _re_-state your API Key and libraries.

In the example above, the HTML snippet states that _prior_ to rendering the `GoogleMap` component, the Google API was loaded into the browser's global namespace and is resident at `global.myProp`. This will us allow just to load the API from the global variable you setup for us.

### Reloading the API

In most use cases, you should try to just load the API once but in some edge cases you might be forced to unload and reload the API. If you find yourself in that situation, then you can force a reload with `forceReload`:

```html
<GoogleMap 
    apiKey="my-big-secret" 
    :libraries="[ 'places', 'localContext' ]" 
    :forceReload="true" 
/>
```

> **Note:** if you've loaded the underlying API yourself you'll then need to do the reloading too

## DOM Props

Every [component](../components/) this library exposes will offer a similar set of parameters you can use to manipulate it. There are the ones you hopefully already know about that come with any self-respecting VueJS component and which map into standard HTML/DOM props:

- `style` - although manipulating the _style_ of component is generally frowned on these days of class-based styling, you can feel free to state this property and we'll obediently do as you ask for the component where you state this.
- `class` - **class** is the _classy_ way of styling and you're free to drop classes in anywhere you like. 

We'll stop there, but you get the point. The main crux of this section is what we'll be referring to as the _Options API_ but before we get to that let's hit one more area of configuration which only applies to the root `GoogleMap` components ...