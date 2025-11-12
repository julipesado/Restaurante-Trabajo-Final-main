export interface Product {
    id: number
    name: string,
    price: number,
    description: string,
    categoryId: number, 
    recommendedFor: number,
    discount: number,
    hasHappyHour: boolean,
}
export type NewProduct = Omit<Product, "id">;