export interface MenuItemModel {
    id: number
    title: string
    description: string
    imageUrl: string
    currentPrice: number
    originalPrice?: number
    isFavorite?: boolean
}
