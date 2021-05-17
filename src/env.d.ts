export interface ImportMeta {
  env: {
    VITE_GOOGLE_API_KEY: string;
    DEV: boolean;
    MODE: "development" | "production";
    PROD: boolean;
    SSR: boolean;
    BASE_URL: string;
  };
}
