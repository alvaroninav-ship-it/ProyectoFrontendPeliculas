//Protege rutas privadas del sistema.
// Controla: Si existe usuario autenticado / Si el JWT ya fue validado / Si el usuario tiene el rol correcto
// Redirección entre rutas
import { Navigate } from 'react-router-dom'
// Tipo React para componentes hijos
import { type ReactNode } from 'react'
// Hook autenticación global
import { useAuth } from '../context/AuthContext'

// Props del componente
interface Props { 
    children: ReactNode 
    allowedRole: 'Administrator' | 'User' 
}

// Componente protección rutas
const ProtectedRoute = ({ children, allowedRole }: Props) => {
   // Usuario y estado loading
  const { user, loading } = useAuth()
   // Esperando validación JWT
  if (loading) {
    return <h2>Cargando...</h2>
  }

  // Si no existe usuario redirige al login
  if (!user) {
    return <Navigate to='/' />
  }

  // Validación de roles
  if (user.role !== allowedRole) {
    // Acceso denegado
    return (<Navigate to='/unauthorized' />)
  }
  // Permite acceso ruta
  return children
}

// Exporta componente protegido
export default ProtectedRoute