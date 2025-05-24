export interface ProductModel {
    id: string
    restaurantId: string
    name: string
    description: string
    price: number
    imageUrl: string,
    tags: string[]
    category: string
    portion: string
    isFavorite: boolean
    suggestions: number[]
}
