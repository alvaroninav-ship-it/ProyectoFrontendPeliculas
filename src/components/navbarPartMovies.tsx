//muestra información básica del usuario autenticado y permite cerrar sesión.
// Navegación entre rutas
import { Link } from 'react-router-dom'
// Hook autenticación global

const NavbarPartMovies = () => {
  // Usuario y logout global

  return (
    
    <div className="PartMovies">
        <h2>🎬 Movie Reviews</h2>

        <input
            type="text"
            placeholder="Buscar películas..."
            className="search"
        />

        <nav>
            <Link to="/home">Inicio</Link>
            <Link to="/profile">Perfil</Link>
        </nav>
    </div>
  )
}

export default NavbarPartMovies