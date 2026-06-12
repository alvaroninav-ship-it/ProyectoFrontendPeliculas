//muestra información básica del usuario autenticado y permite cerrar sesión.
// Navegación entre rutas


import NavbarPartMovies from './navbarPartMovies';
import NavbarPartUser from './navbarPartUser';

// Componente Navbar
const Navbar = () => {
  // Usuario y logout global
  // Cerrar sesion - Logout JWT

  return (
    <header className="navbar">
      <NavbarPartMovies />
      <NavbarPartUser />
    </header>
  )
}

export default Navbar