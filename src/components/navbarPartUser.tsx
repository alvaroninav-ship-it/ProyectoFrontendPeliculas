//muestra información básica del usuario autenticado y permite cerrar sesión.
// Navegación entre rutas
import { useNavigate } from 'react-router-dom'
// Hook autenticación global
import { useAuth } from '../context/AuthContext'

// Componente Navbar
const NavbarPartUser = () => {
  // Usuario y logout global
  const { user, logout } = useAuth()
  // Hook navegación
  const navigate = useNavigate()

  // Cerrar sesion - Logout JWT
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="PartUser">
      <div>    
        Usuario: {user?.name}
      </div>
      <div>
        Rol: {user?.role}
      </div>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
     </div>
  )
}

export default NavbarPartUser