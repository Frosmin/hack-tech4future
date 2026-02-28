import { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const handleInput = (event, setState) => {
    setState(event.target.value)
  }
  return (
    <article className={styles.container}>
      <section className={styles.left}></section>
      <section className={styles.right}>
        <h1>Welcome Back</h1>
        <p>Inicia sesión en tu cuenta para continuar con tu viaje de salud para la piel</p>
        <h3>Correo electrónico</h3>
        <input
          type="text"
          placeholder='Ingresa tu correo electrónico'
          value={email}
          onChange={(event) => handleInput(event, setEmail)}
        />
        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder='Ingresa tu contraseña'
          value={passwd}
          onChange={(event) => handleInput(event, setPasswd)}
        />
        <div className={styles.btnContainer}>
          <Link>Log In</Link>
          <small>¿No tienes cuenta? <span>Registrate</span></small>
        </div>
      </section>
    </article>
  )
}

export default Login