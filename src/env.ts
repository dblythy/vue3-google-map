export interface ImportMyMeta {
  env: {
    VITE_MAP_API_KEY: string;
    VUE_APP_MAP_API_KEY: string;

    VITE_MAP_LIBRARIES: string;
    VUE_APP_MAP_LIBRARIES: string;

    VITE_MAP_LANGUAGE: string;
    VUE_APP_MAP_LANGUAGE: string;

    VITE_MAP_REGION: string;
    VUE_APP_MAP_REGION: string;

    DEV: boolean;
    MODE: "development" | "production";
    PROD: boolean;
    SSR: boolean;
    BASE_URL: string;
  };
}
