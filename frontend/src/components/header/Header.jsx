import styles from './Header.module.css'
import { Link } from 'react-router';

const Header = () => {
    return (
        <article className={styles.container}>
            <nav className={styles.nav}>
                <Link to={'/'} className={styles.links}>Enciclopedia</Link> 
                <Link to={'/'} className={styles.links}>Analizar con IA</Link> 
            </nav>
            <section className={styles.perfil}>
                <button>Log In</button>
            </section>
        </article>
    )
}

export default Header;