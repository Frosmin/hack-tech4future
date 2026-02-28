import styles from './CardConsulta.module.css'
import { useNavigate } from 'react-router'

const CardConsulta = ({ img, title, gravity, id }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/dashboard/${id}`)
  }
  return (
    <div
      className={styles.container}
      onClick={handleClick}
    >
      {/* <div className={styles.img} style={{backgroundImage:`url(${img})`}}></div> */}
      <img src={img} alt="Imagen de referencia" />
      <h2>{title}</h2>
      <p>{gravity}</p>
    </div>
  )
}

export default CardConsulta