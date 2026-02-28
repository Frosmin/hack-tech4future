import styles from './App.module.css'
import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import AnalyzePage from './pages/analizar/Analizar'
import About from './pages/about/About'
import MisConsultas from './pages/consultas/MisConsultas'
import Login from './pages/login/Login'

function App() {

  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/analizar' element={<AnalyzePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/consultas' element={<MisConsultas />} />
        <Route path='/consulta/:id' element={<Home />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
