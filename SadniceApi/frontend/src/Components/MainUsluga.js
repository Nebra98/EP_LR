import React, { useEffect, useState } from 'react'
import Usluga from './Usluga'

const MainUsluga = (props) => {
  let [data, setData] = useState()
  useEffect(() => {
    fetch('http://localhost:5000/usluga', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'null',
      },
      mode: 'cors',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => setData(json))
  }, [])

  const { searchName, onAdd } = props

  return (
    <main className='block col-2'>
      <h2>Usluge</h2>
      <div className='row'>
        <Usluga searchName={searchName} onAdd={onAdd} product={data}></Usluga>
      </div>
    </main>
  )
}

export default MainUsluga
