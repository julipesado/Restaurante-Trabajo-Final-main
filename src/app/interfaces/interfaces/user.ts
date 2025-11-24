export interface User {
    id:number,
    restaurantName: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    isFavorite: any;
}
export type NewUser = Omit<User, "id">;