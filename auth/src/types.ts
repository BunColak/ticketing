export interface IUser {
    username: string
    password: string
}

export interface RegisterPayload {
    username: string
    password: string
}

export interface LoginPayload {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
    username: string
}

export interface TokenPayload {
    id: string
    username: string
}
