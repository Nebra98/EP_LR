import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const useAuth = () => {
  let user = JSON.parse(localStorage.getItem('userInfo'))

  return user && user.admin
}

const Sadnica = (props) => {
  const isAuth = useAuth()
  const navigate = useNavigate()

  const { searchName, onAdd, product } = props
  const obrisi = (sadnica) => {
    if (
      window.confirm('Jeste li sigurni da želite ukloniti ' + sadnica.naziv)
    ) {
      fetch('http://localhost:5000/sadnica', {
        method: 'DELETE',
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'DELETE',
        }),
        body: JSON.stringify(sadnica),
        mode: 'cors',
      })

      window.alert('Uklonili ste ' + sadnica.naziv)
      window.location.reload()
    }
  }
  const uredi = (sadnica) => {
    navigate(`../../uredi/sadnica/${sadnica.id}`, { state: sadnica })
  }
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <td className='ime-td'>
              <b>Ime sadnice</b>
            </td>
            <td className='opis-td'>
              <b>Opis sadnice</b>
            </td>
          </tr>
        </thead>
        <tbody>
          <td>
            {product === undefined
              ? null
              : product.Sadnice.map((product) => (
                  <span key={product.id}>
                    {product.naziv
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ? (
                      // <div className="product ime-td">
                      <tr>
                        <td className='slika'>
                          {/* <span> */}
                          <Link to={`/sadnica/${product.id}`}>
                            <img
                              className='size'
                              src={product.slika}
                              alt={product.naziv}
                            />
                          </Link>
                          {/* </span> */}
                        </td>
                        <td className='naziv'>
                          {/* <div> */}
                          <Link to={`/sadnica/${product.id}`}>
                            <h3>{product.naziv}</h3>
                          </Link>
                          {/* </div> */}
                        </td>
                      </tr>
                    ) : // </div>
                    null}
                  </span>
                ))}
          </td>
          <td>
            {product === undefined
              ? null
              : product.Sadnice.map((product) => (
                  <span key={product.id}>
                    {product.naziv
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ? (
                      <tr>
                        <td className='opis'>
                          <h3>{product.opis}</h3>
                        </td>
                        <td className='gumb'>
                          <button
                            className='button'
                            onClick={() => onAdd(product)}
                          >
                            Dodajte u korpu
                          </button>
                          {isAuth ? (
                            <button
                              className='button'
                              onClick={() => obrisi(product)}
                            >
                              Obriši
                            </button>
                          ) : null}

                          {isAuth ? (
                            <button
                              className='button'
                              onClick={() => uredi(product)}
                            >
                              Uredi
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ) : null}
                  </span>
                ))}
          </td>
        </tbody>
      </table>
    </div>
  )
}
export default Sadnica
