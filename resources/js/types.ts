export interface User {
    id: number
    first_name: string
    email: string

}

export interface Auth {
    user: User
}

export interface Goal {
    id: number
    name: string
    priority: number
}
