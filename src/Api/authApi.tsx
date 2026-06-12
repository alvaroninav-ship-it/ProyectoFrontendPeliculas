import axios from 'axios'

const API = axios.create({
  baseURL: 'https://criticapeliculas.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* ==========================
   LOGIN
   POST /api/Token
========================== */
export const loginRequest = async (
  login: string,
  password: string
) => {
  const response = await API.post('/Token', {
    User: login,
    Password: password
  })

  return response.data
}

/* ==========================
   REGISTRO SECURITY
   POST /api/Security
========================== */

export const registerSecurityRequest = async (
  userId: number,
  login: string,
  password: string,
  name: string,
  role: number = 2
) => {
  const response = await API.post('/Security', {
    userId,
    login,
    password,
    name,
    role
  })

  return response.data
}

/* ==========================
   GUARDAR TOKEN
========================== */

export const saveToken = (token: string) => {
  localStorage.setItem('token', token)
}

/* ==========================
   OBTENER TOKEN
========================== */

export const getToken = () => {
  return localStorage.getItem('token')
}

/* ==========================
   LOGOUT
========================== */

export const logoutRequest = () => {
  localStorage.removeItem('token')
}

/* ==========================
   VERIFICAR LOGIN
========================== */

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const saveUserId = (id: number) => {
  localStorage.setItem("userId", id.toString())
}

export const getUserId = () => {
  return localStorage.getItem("userId")
}
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  const payload = JSON.parse(atob(token.split(".")[1]))

  return (
    payload.nameid ||
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  )
}

export const createUserRequest = async (user: any) => {
  const response = await API.post(
    '/User/dto/mapper',
    user
  )

  return response.data
}

export default API