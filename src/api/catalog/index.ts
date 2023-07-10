import Api from '..'
import { plainToInstance as plainToClass } from 'class-transformer'
import {Product} from "~/api/catalog/products";

const hoodieGroupId = 'edbd202e-f691-4338-83f7-d50f90ec4c7a'
const shirtGroupId = '2f988cd7-9a3b-4f6e-9838-3e3a5ebe9a7c'
const sweatshirtGroupId = '311334fc-8e80-4f16-b8b2-841ce5a3af79'

export class CatalogApi extends Api {
    async findAll() {
        const req = await this.axios.get<Product[]>('/products/catalog')
        return plainToClass(Product, req.data)
    }
    async findByGroup(group: string) {
        const req = await this.axios.get<Product[]>('/products/catalog', {params: {group}})
    }
}

const catalogApi = new CatalogApi()
export default catalogApi

