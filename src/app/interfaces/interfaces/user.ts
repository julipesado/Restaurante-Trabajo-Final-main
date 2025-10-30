export interface User {
    id:number,
    name: string,
    email: string,
    password: string,
    number: string,
    isFavourite?: boolean
}
export type NewUser = Omit<User, "id">;