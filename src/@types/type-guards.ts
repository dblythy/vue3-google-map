import { IMapTypeStyle } from ".";
import { THEMES } from "../shared";
import { CustomTheme, LocalTheme, MapTheme, PreconfiguredTheme } from "./types";

export function isMappedStyles(thing: unknown): thing is IMapTypeStyle[] {
  return (
    Array.isArray(thing) &&
    (thing.length === 0 ||
      (thing[0] as IMapTypeStyle).elementType !== undefined ||
      (thing[0] as IMapTypeStyle).featureType !== undefined)
  );
}

/**
 * Runtime check to validate that what was passed in is an array of _things_ which
 * distinguishes it from theme definitions which will require a network request
 */
export function isLocalTheme(theme: MapTheme): theme is LocalTheme {
  return typeof theme === "object" && Array.isArray(theme);
}

export function isNetworkTheme(theme: unknown): theme is PreconfiguredTheme | CustomTheme {
  return typeof theme === "string" && (theme.startsWith("http") || theme.startsWith("/") || THEMES.includes(theme));
}
