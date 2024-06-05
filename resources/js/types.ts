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

export interface Todo {
    id: number
    priority: number
    effort: number
    value: number
    activity: string
    description: string
    project_id: number
    client_id: number
    goal_id: number
    delivery: string
    goal: Goal
}

export interface Client {
    id: number
    name: string
    color: string
    priority: number

}
