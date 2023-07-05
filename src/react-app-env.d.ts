import 'react'

declare module 'react' {
    interface Attributes {
        styleName?: string
    }
}

declare global {
    interface Window {
        processScanData(data: string): void
    }
}

