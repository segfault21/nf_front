import Api from '..'
import { DateTime } from 'luxon'
import { toJS } from 'mobx'
import {Product} from "~/api/catalog/products";
import { plainToInstance as plainToClass } from 'class-transformer'

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
    async findAll() {
        const req = await this.axios.get<Product[]>('/catalog')
        return plainToClass(Product, req.data)
    }
}

const catalogApi = new CatalogApi()
export default catalogApi

