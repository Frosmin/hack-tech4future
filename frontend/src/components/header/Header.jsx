import usePath from "../../stores/path.store";
import styles from "./Header.module.css";
import { Link } from "react-router";

const Header = () => {
  const { currentPath, updatePath } = usePath();

  const handleClick = (path) => {
    updatePath(path);
  };

  const handleButton = () => {
    updatePath("/login");
  };
  return (
    <article className={styles.container}>
      <article className={styles.logoContainer}>
        <div className={styles.logo}></div>
        <Link to={"/"} onClick={(event) => handleClick("/")}>
          <h2>DermEncyclopedia</h2>
        </Link>
      </article>
      <nav className={styles.nav}>
        <Link
          to={"/"}
          className={`${currentPath === "/" ? styles.isActive : ""}`}
          onClick={() => handleClick("/")}
        >
          Enciclopedia
        </Link>
        <Link
          to={"/analizar"}
          className={`${currentPath === "/analizar" ? styles.isActive : ""}`}
          onClick={() => handleClick("/analizar")}
        >
          Analizar con IA
        </Link>
        <Link
          to={"/about"}
          className={`${currentPath === "/about" ? styles.isActive : ""}`}
          onClick={() => handleClick("/about")}
        >
          About Us
        </Link>
      </nav>
      <article className={styles.right}>
        <Link className={styles.button} onClick={handleButton} to={"/login"}>
          Log In
        </Link>
      </article>
    </article>
  );
};

export default Header;
