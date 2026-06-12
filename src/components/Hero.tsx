

import Button from './Button';
import './Hero.css'
export default function Hero() {

  return (   
    <header className="hero">

    <div className="overlay">

        <h1>🎬 Movie Reviews</h1>

        <p>
            Descubre películas, comparte reseñas
            y comenta las opiniones de otros usuarios.
        </p>

        <div className="buttons">
            <Button variant="primary" onClick={() => window.location.href = '/login'}>
                Iniciar Sesión
            </Button>

            <Button variant="secondary" onClick={() => window.location.href = '/register'}>
                Crear Cuenta
            </Button>
        </div>

    </div>

</header>
  );
}