import { InjectionKey, Ref } from "vue";
import { IGoogleMapsAPI, IMap } from "../@types/index";

export const API_SYMBOL: InjectionKey<Ref<IGoogleMapsAPI | null>> = Symbol("api");
export const MAP_SYMBOL: InjectionKey<Ref<IMap | null>> = Symbol("map");
// export const loaderInstance = ref<Loader | null>(null);

export const MAP_EVENTS = [
  "bounds_changed",
  "center_changed",
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "heading_changed",
  "idle",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "resize",
  "rightclick",
  "tilesloaded",
  "tilt_changed",
  "zoom_changed",
];

export const MARKER_EVENTS = [
  "animation_changed",
  "click",
  "dblclick",
  "rightclick",
  "dragstart",
  "dragend",
  "drag",
  "mouseover",
  "mousedown",
  "mouseout",
  "mouseup",
  "draggable_changed",
  "clickable_changed",
  "contextmenu",
  "cursor_changed",
  "flat_changed",
  "rightclick",
  "zindex_changed",
  "icon_changed",
  "position_changed",
  "shape_changed",
  "title_changed",
  "visible_changed",
];

export const POLYLINE_EVENTS = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick",
];

export const POLYGON_EVENTS = POLYLINE_EVENTS;
export const RECTANGLE_EVENTS = POLYLINE_EVENTS.concat(["bounds_changed"]);
export const CIRCLE_EVENTS = POLYLINE_EVENTS.concat(["center_changed", "radius_changed"]);

export const THEMES = ["aubergine", "dark", "grey", "minimal", "roadways", "roadwaysMinimal", "ultraLight"];
export const THEME_ROOT = "https://raw.githubusercontent.com/inocan-group/vue3-google-map/master/themes";
