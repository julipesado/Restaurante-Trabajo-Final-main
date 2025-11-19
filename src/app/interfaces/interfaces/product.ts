export interface Product {
    id: number
    name: string,
    price: number,
    description: string,
    categoryId: number, 
    recommendedFor: number,
    discount: number,
    hasHappyHour: boolean,
    featured: boolean, 
    restaurantId: number
}
export type NewProduct = Omit<Product, "id">;
export interface HappyHour{
    hasHappyHour: boolean,
}