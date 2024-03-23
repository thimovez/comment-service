import { UserResponse } from "src/users/interfaces/user.interface"

export interface SingInResponse {
    user: UserResponse
    tokens: {
        access_token: string
        refresh_token: string    
    }
}
