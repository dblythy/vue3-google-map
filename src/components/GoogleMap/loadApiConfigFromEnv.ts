import { LoaderOptions } from "@googlemaps/js-api-loader";
import { IEnvConfig } from "/@src/@types";
import { getEnv } from "/@src/shared/getEnv";

/**
 * looks in ENV variables for API configuration defaults
 */
export function loadApiConfigFromEnv(): IEnvConfig {
  const env = getEnv();
  return {
    apiKey: env.VITE_MAP_API_KEY || env.VUE_APP_MAP_API_KEY || "",
    libraries: (env.VITE_MAP_LIBRARIES || env.VUE_APP_MAP_LIBRARIES || "places").split(
      /,\s*/
    ) as LoaderOptions["libraries"],
    language: env.VITE_MAP_LANGUAGE || env.VUE_APP_MAP_LANGUAGE,
    region: env.VITE_MAP_REGION || env.VUE_APP_MAP_REGION,
  };
}
