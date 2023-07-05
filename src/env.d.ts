interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_API_URL: string
    readonly VITE_WS_URL: string
    readonly VITE_TASK_TRIGGER_SECRET_WORD: string
    readonly VITE_SENTRY_DSN?: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
