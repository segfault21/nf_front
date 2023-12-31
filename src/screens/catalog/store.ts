import { MobxStore, observableStore } from '../useMobx'
import catalogApi, {AssortmentMinimalInfo} from "../../api/catalog";
import {Product} from "~/api/catalog/products";

@observableStore
export class CatalogStore extends MobxStore {
    data: Product[]
    loading: boolean
    async initialize() {
        if (this.data || this.loading) return
        this.loading = true
        const data = await catalogApi.findAll()
        this.setInfo(data)
    }

    info() {
        return this.data
    }
    setInfo(data: Product[]) {
        this.data = data.filter((d) => d.images.length > 0)
        this.loading = false
    }
}
