---
sidebar: auto
---

# Themes

## Introduction

Google's Map API provides the means to configure your map to look the way _you_ want it to look. This includes changing colors, determining what details should be displayed what should not, and much more. Below are links for the official docs as well as a cool (and free) site to help you design your own customizations:

- [Google API Docs for Map Customization](https://developers.google.com/maps/documentation/javascript/styling)
- [Snazzy Maps](https://snazzymaps.com/)

The way that the API provides for you to add in your _styling_ is to drop in your styling to the "styles" property on the configuration hash. You can certainly do this, and it would look something like this:

```html
<GoogleMap :config=" { styles: [ YOUR STYLES HERE ] }">
```
> Note: the styles are _typed_ as an array of `IMapTypeStyle` objects; this interface is available from this repo (but is just a proxy of the official typings)

Because adjusting the look and feel is such an important thing for most websites, however, we've added a root level property to help you with this called `theme`. The `theme` variable offers you both a set of _pre-configured_ styles and an async way to load your own.

> Note: to keep bundle size low, you don't want to just load a ton of different styles right away but rather it's better to just use this _async_ API to load in what you need when you need it.

In the remainder of this section we'll cover the pre-configured options along with how you can use your own.

## Using Themes

### Preconfigured Themes

<ThemesExample />

To use a default theme simply pass the theme's name to the `theme` prop of the `GoogleMap` component. The available themes are:

- `aubergine`
- `dark`
- `grey`
- `minimal`
- `retro`
- `roadways`
- `roadwaysMinimal`
- `ultraLight`

<!-- prettier-ignore -->
```vue
<GoogleMap zoom="4" :theme="theme" />
```


## Custom Styles

::: warning
Please be aware that if you specify a default theme that it will overrride any custom styles you define.
:::

Alternatively you can define your own styles by passing them to the `styles` prop of the `GoogleMap` component. Please refer to the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.styles) on custom styles.
