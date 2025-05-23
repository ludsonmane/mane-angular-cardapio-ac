export interface MenuItemModel {
    id: string
    title: string
    description: string
    imageUrl: string
    currentPrice: number
    originalPrice?: number
    isFavorite?: boolean
}
