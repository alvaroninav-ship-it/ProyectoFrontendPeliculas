import "./Card.css";


//children: contenido dinámico
//variant: tipo del boton (color)
type CardProps = {
  logo: string;
  children?: React.ReactNode;
};

function Card({
  logo,
  children,
}: CardProps) {
  return (
    <div className="card">
        {logo}{children}
    </div>
  );
}

export default Card;