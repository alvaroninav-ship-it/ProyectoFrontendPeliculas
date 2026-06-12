import "./Button.css";

//solo se permiten estos valores
type Variant = "primary" | "secondary" | "danger";

//children: contenido dinámico
//variant: tipo del boton (color)
//size: tamano
//onclick: funcion al click
//disabled: true/false habilitado
type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;