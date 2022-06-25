import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const useAuth = () => {
  let user = JSON.parse(localStorage.getItem('userInfo'))

  return user && user.admin
}

const Usluga = (props) => {
  const isAuth = useAuth()
  const navigate = useNavigate()
  const { searchName, onAdd, product } = props

  const obrisi = (usluga) => {
    if (window.confirm('Jeste li sigurni da želite ukloniti ' + usluga.naziv)) {
      fetch('http://localhost:5000/usluga', {
        method: 'DELETE',
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'DELETE',
        }),
        body: JSON.stringify(usluga),
        mode: 'cors',
      })

      window.alert('Uklonili ste ' + usluga.naziv)
      window.location.reload()
    }
  }

  const uredi = (usluga) => {
    navigate(`../../uredi/usluga/${usluga.id}`, { state: usluga })
  }

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <td className='ime-td'>
              <b>Ime usluge</b>
            </td>
            <td className='opis-td'>
              <b>Opis usluge</b>
            </td>
          </tr>
        </thead>
        <tbody>
          <td>
            {product === undefined
              ? null
              : product.Usluge.map((product) => (
                  <span key={product.id}>
                    {product.naziv
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ? (
                      // <div className="product ime-td">
                      <tr>
                        <td className='slika'>
                          {/* <span> */}
                          <Link to={`/usluga/${product.id}`}>
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
                          <Link to={`/usluga/${product.id}`}>
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
              : product.Usluge.map((product) => (
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
                              {/* <Link to={`../../uredi/usluga/${product.id}`}> */}
                              Uredi
                              {/* </Link> */}
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
    // <div>
    //   {product === undefined
    //     ? null
    //     : product.Usluge.map((product) => (
    //         <div key={product.id} className="flex">
    //           {product.naziv
    //             .toLowerCase()
    //             .includes(searchName.toLowerCase()) ? (
    //             <div className="product">
    //               <div>{product.slika}</div>
    //               <Link to={`/usluga/${product.id}`}>
    //                 <img
    //                   className="small"
    //                   src={product.slika}
    //                   alt={product.naziv}
    //                 />
    //               </Link>

    //               <Link to={`/usluga/${product.id}`}>
    //                 <h3>{product.naziv}</h3>
    //               </Link>
    //               <div>
    //                 <button onClick={() => onAdd(product)}>
    //                   Dodajte u korpu
    //                 </button>
    //               </div>
    //             </div>
    //           ) : null}
    //         </div>
    //       ))}
    // </div>
  )
}
export default Usluga
