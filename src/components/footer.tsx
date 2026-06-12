
type FooterProps = {
    title?: string;
    description?: string;
};

export default function Footer({ title, description }: FooterProps) {

  return (   
  <footer>

    <h3>{title}</h3>

    <p>
        {description}
    </p>

   </footer>
  );
}