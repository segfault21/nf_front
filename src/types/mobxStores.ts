export interface MobxStores {
    batches: boolean
    acceptances: boolean
    itemsStorage: boolean
    containers: {
        stages: boolean
        logs: boolean
    }
    stages: Map<string, boolean>
}
