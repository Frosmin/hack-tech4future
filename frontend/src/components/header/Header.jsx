import styles from './Header.module.css'
import { Link } from 'react-router';

const Header = () => {
    return (
        <article className={styles.container}>
            <nav className={styles.nav}>
                <Link to={'/'}>Enciclopedia</Link> 
                <Link to={'/'}>Analizar con IA</Link> 
            </nav>
            <section className={styles.perfil}>
                <button>Log In</button>
            </section>
        </article>
    )
}

export default Header;