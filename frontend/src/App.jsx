import styles from './App.module.css'
import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import Analizar from './pages/analizar/Analizar'
import About from './pages/about/About'
import Login from './pages/login/login'

function App() {

  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/analizar' element={<Analizar />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
