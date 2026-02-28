import usePath from "../../stores/path.store";
import { useUser } from "../../stores/user.store";
import styles from "./Header.module.css";
import { Link } from "react-router";

const Header = () => {
  const { currentPath, updatePath } = usePath();
  const { user, logout } = useUser();

  const handleClick = (path) => {
    updatePath(path);
  };

  const handleButton = () => {
    updatePath("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    updatePath("/login");
  };

  return (
    <article className={styles.container}>
      <article className={styles.logoContainer}>
        <div className={styles.logo}></div>
        <Link to={"/"} onClick={(event) => handleClick("/")}>
          <h2>MediScanAI</h2>
        </Link>
      </article>
      <nav className={styles.nav}>
        <Link
          to={"/"}
          className={`${currentPath === "/" ? styles.isActive : ""}`}
          onClick={() => handleClick("/")}
        >
          Inicio
        </Link>
        {user && (
          <Link
            to={"/analizar/0"}
            className={`${currentPath === "/analizar" ? styles.isActive : ""}`}
            onClick={() => handleClick("/analizar")}
          >
            Analizar con IA
          </Link>
        )}

        {user && (
          <Link
            to={"/consultas"}
            className={`${currentPath === "/consultas" ? styles.isActive : ""}`}
            onClick={() => handleClick("/consultas")}
          >
            Mis consultas
          </Link>
        )}
      </nav>
      {!user ? (
        <article className={styles.right}>
          <Link className={styles.button} onClick={handleButton} to={"/login"}>
            Iniciar sesión
          </Link>
        </article>
      ) : (
        <article className={styles.right}>
          <Link
            className={styles.button}
            style={{ backgroundColor: "red" }}
            to={"/login"}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Link>
        </article>
      )}
    </article>
  );
};

export default Header;
