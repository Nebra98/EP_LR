import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigacija from '../Components/Navigacija'

const EditSadnica = () => {
  const location = useLocation()
  const [naziv, setNaziv] = useState(location.state.naziv)
  const [cijena, setCijena] = useState(location.state.cijena)
  const [slika, setSlika] = useState(location.state.slika)
  const [opis, setOpis] = useState(location.state.opis)
  const [tip, setTip] = useState(location.state.tip)
  const [id, setId] = useState(location.state.id)

  let [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/sadnica', {
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

  const submitHandler = (e) => {
    e.preventDefault()
    const data = { naziv, slika, tip, opis, cijena, id }
    console.log(data)

    fetch('http://localhost:5000/sadnica', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'cors',
    })
    window.alert('Promjenili ste sadnicu koja se zove ' + naziv)
    navigate('/')
  }
  return (
    <div className='editSadnica'>
      <div className='opacity'>
        <Navigacija></Navigacija>
      </div>
      <div className='block opacity1'>
        <h1>Uredi</h1>
        {data !== undefined ? (
          <form className='form' onSubmit={submitHandler}>
            <div>
              <label htmlFor='naziv'>Naziv</label>
              <input
                type='text'
                id='naziv'
                placeholder='Unesite naziv'
                value={naziv}
                required
                onChange={(e) => setNaziv(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='slika'>Slika</label>
              <input
                type='text'
                id='slika'
                placeholder='Unesite URL slike'
                value={slika}
                required
                onChange={(e) => setSlika(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='cijena'>Cijena</label>
              <input
                type='number'
                id='cijena'
                placeholder='Unesite cijenu'
                value={cijena}
                required
                onChange={(e) => setCijena(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='tip'>Tip</label>
              <input
                type='text'
                id='tip'
                placeholder='Unesite tip'
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='opis'>Opis</label>
              <input
                type='text'
                id='opis'
                placeholder='Unesite opis'
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
              />
            </div>

            <button className='primary' type='submit'>
              Uredi
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default EditSadnica
