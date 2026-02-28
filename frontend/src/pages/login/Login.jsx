import { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router";
import { useAxios } from "../../hooks/axios";
import { useUser } from "../../stores/user.store";
import usePath from "../../stores/path.store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  // update path
  const { updatePath } = usePath();

  // Extraemos nuestro custom hook y estado global
  const { request, loading, error } = useAxios();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleInput = (event, setState) => {
    setState(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !passwd) return;

    // Realizamos la petición al backend a la ruta pública
    const result = await request({
      method: "POST",
      url: "/public/login",
      data: {
        email: email,
        password: passwd,
      },
    });

    //logica
    if (result && result.token) {
      localStorage.setItem("token", result.token);

      setUser(result.user);
      updatePath("/");
      navigate("/");
    }
  };

  return (
    <article className={styles.container}>
      <section className={styles.left}></section>
      <section className={styles.right}>
        <h1>Bienvenido</h1>
        <p>
          Inicia sesión en tu cuenta para continuar con tu viaje de salud para
          la piel
        </p>

        {/* Mostrar mensaje de error si el login falla */}
        {error && (
          <p style={{ color: "var(--error)", fontWeight: "bold" }}>
            {error.error || "Ocurrió un error al iniciar sesión"}
          </p>
        )}

        <h3>Correo electrónico</h3>
        <input
          type="text"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(event) => handleInput(event, setEmail)}
        />

        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={passwd}
          onChange={(event) => handleInput(event, setPasswd)}
        />

        <div className={styles.btnContainer}>
          <Link
            onClick={handleLogin}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </Link>
          <small>
            ¿No tienes cuenta? <span>Registrate</span>
          </small>
        </div>
      </section>
    </article>
  );
};

export default Login;
