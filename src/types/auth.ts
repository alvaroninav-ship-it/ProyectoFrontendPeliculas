export interface User {
  id: number
  login: string
  name: string
  role: string

}

export interface RegisterUserDto {
  firstName: string
  lastName: string
  email: string
  dateOfBirth?: string
  telephone?: string
  isActive: boolean
  rol: string
}

export interface LoginResponse {
  token: string
}