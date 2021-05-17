import { Ref } from "vue";
import { IMap, MapTheme, isMappedStyles, isLocalTheme, isNetworkTheme } from "../../@types";
import destr from "destr";
import { THEME_ROOT } from "/@src/shared";
import { MapError } from "/@src/errors";

/**
 * Asynchronously load the the given them and the modifies the map's
 * `styles` property to reflect this theme once loaded.
 */
export async function loadTheme(theme: MapTheme, map: Ref<IMap>): Promise<void> {
  if (theme === null || theme === "") {
    map.value.setOptions({ styles: [] });
  }
  if (isLocalTheme(theme)) {
    if (isMappedStyles(theme)) {
      map.value.setOptions({ styles: theme });
    } else {
      throw new MapError(
        `The map theme passed in was not a valid 'IMapTypeStyle.\n\nTHEME: ${theme}`,
        "theme/invalid-definition"
      );
    }
  }

  if (isNetworkTheme(theme)) {
    const url = theme.startsWith("http") ? theme : `${THEME_ROOT}/${theme}.json`;
    try {
      const content = await fetch(url);
      if (content.ok) {
        const styles = destr(await content.json());
        if (isMappedStyles(styles)) {
          map.value.setOptions({ styles });
        } else {
          throw new MapError(
            `The requested theme was loaded over the network but it does not appear to be a valid theme payload. Themes are expected to be JSON parsable arrays which conform to the 'IMapTypeStyle' interface.`,
            "theme/invalid-file"
          );
        }
      }
    } catch (error) {
      throw new MapError(`Problem loading theme ${theme}: ${error.message}`, "theme/could-not-load");
    }
  } else {
    throw new MapError(`Problem with theme passed into loadTheme.\n\nTHEME: ${theme}`, "theme/invalid-theme");
  }
}
