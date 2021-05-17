import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { Ref } from "vue";
import { IMapOptions } from "/@src/@types";
import { ApiError } from "/@src/errors";

/**
 * Loads the Google API asynchronously
 */
export async function loadApi(
  apiOptions: LoaderOptions,
  el: Ref<HTMLElement>,
  mapOptions: IMapOptions
): Promise<google.maps.Map<HTMLElement>> {
  try {
    const loader = new Loader(apiOptions);
    await loader.load();
    const { Map } = google.maps;
    const map = new Map(el.value as HTMLElement, mapOptions);
    return map;
  } catch (error) {
    throw new ApiError(`issues with Google's API loader: ${error.message}`, "loader/failure");
  }
}
