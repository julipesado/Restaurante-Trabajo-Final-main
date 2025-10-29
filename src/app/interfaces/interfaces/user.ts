export interface User {
    id:number,
    name: string,
    email: string,
    password: string
}
export type NewUser = Omit<User, "id">;