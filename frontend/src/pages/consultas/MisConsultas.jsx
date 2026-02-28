import { useEffect, useState } from 'react'
import CardConsulta from './components/CardConsulta'
import styles from './MisConsultas.module.css'
import { useAxios } from '../../hooks/axios'

// const data = [
//   {
//     photo: "sara.png",
//     title: "Es el titulo",
//     gravity: "lethal",
//     recuperation: "health points"
//   },
// ]

const MisConsultas = () => {
  const [list, setList] = useState([])
  const { request, loading, error, data } = useAxios()

  useEffect(() => {
    const getData = async () => {
      const result = await request({
        method: "GET",
        url: "/protected/misPatologias",
      });

      if (result) {
        setList(data)
      }
      console.log(list)
    }
  }, [])

  return (
    <article className={styles.container}>
      <h1>Histórico de consultas</h1>
      <div className={styles.cardContainer}>
        {
          list?.map(e => (
            <CardConsulta
              key={e.id}
              img={e.Image}
              title={e.title}
              gravity={e.gravity}
            />
          ))
        }
      </div>
    </article>

  )
}

export default MisConsultas