import styles from './App.module.css'
import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/Home"

function App() {

  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
