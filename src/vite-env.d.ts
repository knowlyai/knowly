/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_CHAT_URL: string
  readonly VITE_BUCKET_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
