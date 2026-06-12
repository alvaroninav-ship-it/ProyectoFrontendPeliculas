import "./Card.css";

import { useNavigate } from "react-router-dom";
//children: contenido dinámico
//variant: tipo del boton (color)
type MovieCardProps = {
  id:number,
  title: string;
  image: string;
  rating?:number;
  numberOfReviews?:number;
};
function MovieCard({
  id,
  title,
  image,
  rating,
  numberOfReviews
}: MovieCardProps)
{
  
  const navigate = useNavigate()
  return (
    <div className="movie-card">
      <img
        src={image}
        alt={title}
        onClick={() => navigate(`/movie/${id}`)}
      style={{ cursor: "pointer" }}
      />

      <div className="movie-info">

        <h3>{title}</h3>

        <div className="rating">
          ⭐ {rating}
        </div>

        <span>
          {numberOfReviews} reseñas
        </span>

      </div>

    </div>
  )
}
export default MovieCard;