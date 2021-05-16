import * as themes from "../themes/index";
import type { LoaderOptions } from "@googlemaps/js-api-loader";

export type IGoogleMapsAPI = typeof google.maps;
export type IMap = google.maps.Map;
/**
 * [Typeings](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/googlemaps/reference/map.d.ts#L426)
 */
export type IMapOptions = google.maps.MapOptions;
export type ILatLng = google.maps.LatLng;
export type IControlPosition = keyof typeof google.maps.ControlPosition;
export type IScaleControlStyle = google.maps.ScaleControlStyle;
export type IMapTypeControlOptions = google.maps.MapTypeControlOptions;
export type IMapTypeId = google.maps.MapTypeId;
export type IMapRestriction = google.maps.MapRestriction;
export type IStreetViewPanorama = google.maps.StreetViewPanorama;
export type IMapTypeStyle = google.maps.MapTypeStyle;

export type IMarker = google.maps.Marker;
export type IPolyline = google.maps.Polyline;
export type IPolygon = google.maps.Polygon;
export type IRectangle = google.maps.Rectangle;
export type ICircle = google.maps.Circle;

export type IMarkerOptions = google.maps.MarkerOptions;
export type IPolylineOptions = google.maps.PolylineOptions;
export type IPolygonOptions = google.maps.PolygonOptions;
export type IRectangleOptions = google.maps.RectangleOptions;
export type ICircleOptions = google.maps.CircleOptions;

export type ITheme = keyof typeof themes;

export type AspectRatio = `${number}:${number}` | undefined;
/**
 * The API is either a string property where it represents the `apiKey` or
 * it is a hash representing all the properties that can be used to instantiate
 * the Google Api.
 */
export type Api = string | LoaderOptions;

export type MapTheme =
  | "aubergine"
  | "dark"
  | "grey"
  | "minimal"
  | "retro"
  | "roadways"
  | "roadwaysMinimal"
  | "ultalight";
