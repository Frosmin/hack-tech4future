import usePath from "../../stores/path.store";
import styles from "./Footer.module.css";
import { Link } from "react-router";

const footerText =
  "Plataforma impulsada por IA para identificar y clasificar distintos tipos de manchas cutáneas a partir de imágenes. Esta herramienta no reemplaza la evaluación médica profesional; su objetivo es brindar orientación informativa y educativa.";

const Footer = () => {
  const { updatePath } = usePath();

  const handleClick = (path) => {
    updatePath(path);
  };
  return (
    <footer className={styles.container}>
      <section className={styles.section}>
        <article className={styles.info}>
          <div className={styles.logoContainer}>
            <div className={styles.logo} />
            <h3>DermEncyclopedia</h3>
          </div>
          <p>{footerText}</p>
        </article>
        <article className={styles.enlaces}>
          <h3>Enlaces</h3>
          <Link to={"/"} onClick={() => updatePath("/")}>
            Enciclopedia
          </Link>
          <Link to={"/analizar"} onClick={() => updatePath("/analizar")}>
            Analizar con IA
          </Link>
          <Link to={"/about"} onClick={() => handleClick("/about")}>
            About Us
          </Link>
        </article>
        <article className={styles.contactos}>
          <h3>Contáctanos</h3>
          <Link to={"mailto:gruposcoutangloamericanocbba@gmail.com"}>
            Correo Electrónico
          </Link>
          <Link
            to={"https://m.me/AngloAmericano225"}
            target="_blank"
            rel="noopener"
          >
            Facebook
          </Link>
          <Link to={"https://wa.me/59168499752"} target="_blank" rel="noopener">
            WhatsApp
          </Link>
        </article>
        <article className={styles.siguenos}>
          <h3>Siguenos</h3>
          <div className={styles.itemContainer}>
            <Link
              to={"https://www.facebook.com/AngloAmericano225"}
              target="_blank"
              rel="noopener"
            >
              <img src="facebook.svg" alt="Facebook icon" />
            </Link>
            <Link
              to={"https://www.instagram.com/p/Clbq8okLgLM/"}
              target="_blank"
              rel="noopener"
            >
              <img src="instagram.svg" alt="Instagram icon" />
            </Link>
            <Link
              to={"https://www.tiktok.com/@gruposcoutangloamericano"}
              target="_blank"
              rel="noopener"
            >
              <img src="tiktok.svg" alt="Tiktok icon" />
            </Link>
          </div>
        </article>
      </section>
      <article className={styles.down}>
        <small>&copy; ChocoMilk Technologies for the future</small>
      </article>
    </footer>
  );
};

export default Footer;
