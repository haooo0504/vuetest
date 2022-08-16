interface ViteEnv {
  VITE_SOME_KEY: number;
  VITE_ROUTE_AUTOLOAD: boolean;
  VITE_API_URL: string;
  // firebase
  VITE_API_KEY: string;
  VITE_AUTH_DOMAIN: string;
  VITE_PROJECT_ID: string;
  VITE_STORAGE_BUCKET: string;
  VITE_MESSAGING_SENDER_ID: string;
  VITE_APP_ID: string;
  VITE_MEASUREMENT_ID: string;
}

interface ImportMetaEnv extends ViteEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
