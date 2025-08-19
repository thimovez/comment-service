// TODO create UserRequest and UserResponse interface

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
}
