import {Type} from "class-transformer";

export type ProductPriceRelationType =
    | 'EQUAL'
    | 'INCREMENT'
    | 'DECREMENT'
    | 'MULTIPLY'
    | 'DIVIDE'
export class ProductPrice {
    value: number
    priceTypeId: string
    productId: string

    relative: boolean
    targetProductId: string | null
    targetModificationId: string | null
    targetTypeId: string | null
    relationType: ProductPriceRelationType | null
    relationChangeValue: number | null
}
export class Product {
    id: string
    name: string
    article?: string
    volume?: number
    weight?: number
    images: string[]
    productGroupId: string
    archived: boolean
    description?: string
    @Type(() => ProductPrice)
    prices: ProductPrice[]

    @Type(() => CustomFieldValue)
    fields: CustomFieldValue[]
}

export class CustomFieldValue {
    stringValue: string
    numericValue: number
    boolValue: boolean
    dateValue: string

    customFieldId: string

    @Type(() => CustomEntityValue)
    customEntityValue?: CustomEntityValue
    customEntityValueId?: string
}

export class CustomEntity {
    id: string

    @Type(() => CustomEntityValue)
    values: CustomEntityValue[]
}
export class CustomEntityValue {
    id: string
    value: string

    customEntityId: string

    @Type(() => CustomEntity)
    customEntity: CustomEntity
}


