export interface User {
    id:number,
    restaurantName: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    isFavourite?: boolean
}
export type NewUser = Omit<User, "id">;