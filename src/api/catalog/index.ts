import Api from '..'
import { DateTime } from 'luxon'
import { toJS } from 'mobx'

export type AssortmentMinimalInfo = {
    id: string
    article: string
    name: string
}

export class CatalogApi extends Api {
    async findMinimalInfo() {
        const req = await this.axios.get<AssortmentMinimalInfo[]>(
            '/catalog/minimal-info',
        )
        return req.data
    }
}

const catalogApi = new CatalogApi()
export default catalogApi

