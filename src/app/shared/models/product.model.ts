export interface ProductModel {
    id: string
    restauranteId: number
    name: string
    description: string
    price: number
    imageUrl: string,
    tags: string[]
    category: string
    isFavorite: boolean
    suggestions: number[]
}
