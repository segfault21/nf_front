import { MobxStore, observableStore } from '../useMobx'

import catalogApi, {AssortmentMinimalInfo} from "../../api/catalog";

@observableStore
export class CatalogStore extends MobxStore {
    data: AssortmentMinimalInfo[]
    loading: boolean
    async initialize() {
        if (this.data || this.loading) return
        this.loading = true
        const data = await catalogApi.findMinimalInfo()
        this.setInfo(data)
    }

    info() {
        return this.data
    }
    setInfo(data: AssortmentMinimalInfo[]) {
        this.data = data
        this.loading = false
    }
}
