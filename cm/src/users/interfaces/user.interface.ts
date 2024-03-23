// TODO create UserRequest and UserResponse interface

export interface User {
    email: string,
    password: string
}

export interface UserResponse {
    id: number,
    email: string
}