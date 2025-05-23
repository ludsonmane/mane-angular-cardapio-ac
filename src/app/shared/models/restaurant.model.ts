export interface RestaurantModel {
    id: string
    locationId: string
    name: string
    description: string
    imageLogoUrl: string
    imageAboutUrl: string
    about: string
    theme: { headerBg: string, colorText: string, buttonBg: string }
    chefTips: string[]
}
