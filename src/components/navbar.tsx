//muestra información básica del usuario autenticado y permite cerrar sesión.
// Navegación entre rutas
import { useNavigate } from 'react-router-dom'
// Hook autenticación global
import { useAuth } from '../context/AuthContext'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
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