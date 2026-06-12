import { Link } from "react-router-dom";
import NotFoundImage from '../assets/NotfoundImage.png'
export default function NotFoundPage() {
  return (
    <div className="not-found">
      <img src={NotFoundImage} alt="Not Found" className="not-found-image" />
      <h1>X</h1>
      <p>Página no encontrada</p>
      <br />
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}