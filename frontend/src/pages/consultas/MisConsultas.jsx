import { useEffect, useState } from 'react'
import CardConsulta from './components/CardConsulta'
import styles from './MisConsultas.module.css'
import { useAxios } from '../../hooks/axios'

const MisConsultas = () => {
  const [list, setList] = useState([])
  const { request, loading, error, data } = useAxios()

  const last = {
    Image: 'plus.jpg',
    title: 'Agregar nuevo',
    gravity: '',
    id: 0,
  }

  useEffect(() => {
    const getData = async () => {
      const result = await request({
        method: "GET",
        url: "/protected/misPatologias",
      });

      if (result) {
        setList([...result, last])
      }
    }
    getData()
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
              id={e.id}
            />
          ))
        }
      </div>
    </article>

  )
}

export default MisConsultas