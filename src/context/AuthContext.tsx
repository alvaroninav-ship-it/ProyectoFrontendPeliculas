import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { loginRequest } from '../Api/authApi'
import type { User } from '../types/auth'

interface AuthContextProps {
  user: User | null
  loading: boolean
  login: (login: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verificarSesion()
  }, [])

  const verificarSesion = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))

      const role =
        payload.role ||
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      setUser({
        login: payload.Login || '',
        name: payload.Name || '',
        role: role || '',
        id: payload.Id || 0
      })
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
    }

    setLoading(false)
  }

  const login = async (login: string, password: string) => {
    try {
      const response = await loginRequest(login, password)

      localStorage.setItem('token', response.token)

      const payload = JSON.parse(atob(response.token.split('.')[1]))

      const role =
        payload.role ||
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      setUser({
        login: payload.Login || '',
        name: payload.Name || '',
        role: role || '',
        id: payload.Id || 0
      })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)