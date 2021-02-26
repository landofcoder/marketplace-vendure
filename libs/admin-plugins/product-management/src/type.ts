export type ProductVariant = {
    id: string
    enabled: string
    languageCode: string
    translations: {
        id: string
        name: string
        languageCode: string
    }
    sku: string
    price: number
    taxCategory: {
    id: string
    name: string
    }
    facetValues: {
        id: string
        name: string
    }
    featuredAsset: {
        id: string
        source: string
    }
    assets: {
        id: string
        name: string
        source: string
    }
    trackInventory: boolean
    stockOnHand: number
}

export type Product = {
    id: string
    enabled: boolean
    languageCode: string
    translations: {
        id: string;
        name: string
        slug: string
        description: string
        languageCode: string
    }
    facetValues: {
        id: string
        name: string
    }
    variants : ProductVariant[];
}

export type ResultProductGrid = {
    totalItems: number
    items: Product[]
}




