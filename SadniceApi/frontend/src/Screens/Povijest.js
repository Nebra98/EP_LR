import React, { useEffect, useState } from 'react'
import Navigacija from '../Components/Navigacija'

const OrderHistory = (props) => {
  const userInfoLoad = JSON.parse(localStorage.getItem('userInfo' || '[]'))

  const [userInfo, setUserInfo] = useState(userInfoLoad)

  let [dataSadnice, setDataSadnice] = useState({})
  let [dataUsluge, setDataUsluge] = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/sadnica_korisnik', {
      method: 'GET',
      headers: new Headers({
        'Access-Control-Allow-Origin': 'null',
        'x-access-token': userInfo.token,
      }),
      mode: 'cors',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => setDataSadnice(json))
  }, [userInfo.token])
  useEffect(() => {
    fetch('http://localhost:5000/usluga_korisnik', {
      method: 'GET',
      headers: new Headers({
        'Access-Control-Allow-Origin': 'null',
        'x-access-token': userInfo.token,
      }),
      mode: 'cors',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => setDataUsluge(json))
  }, [userInfo.token])

  return (
    <div className='App povijest'>
      <div className='opacity'>
        <Navigacija></Navigacija>
      </div>
      <div className='block opacity1'>
        <h1>Povijest narudžbi</h1>
        {dataSadnice.Sadnice !== undefined ? (
          <div>
            <h2>Sadnice</h2>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Naziv</th>
                  <th>Cijena</th>
                  <th>Količina</th>
                </tr>
              </tbody>
              {dataSadnice.Sadnice !== undefined
                ? dataSadnice.Sadnice.map((order) => (
                    <tbody key={order.id}>
                      <>
                        <tr className='long'>
                          <td className='height'>
                            {/* <img
                              className='size'
                              src={order.slika}
                              alt={order.naziv}
                            /> */}
                            {order.sadnica}
                          </td>

                          <td className='height'>
                            {order.cijena * order.broj} €
                          </td>
                          <td className='height'>{order.broj}</td>
                        </tr>
                      </>
                    </tbody>
                  ))
                : null}
            </table>
          </div>
        ) : null}

        {dataUsluge.Usluge !== undefined ? (
          <div>
            <h2>Usluge</h2>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Naziv</th>
                  <th>Cijena</th>
                </tr>
              </tbody>
              {dataUsluge.Usluge !== undefined
                ? dataUsluge.Usluge.map((order) => (
                    <tbody key={order.id}>
                      <tr className='long '>
                        <td className='height'>
                          {/* <img
                            className='size'
                            src={order.slika}
                            alt={order.naziv}
                          /> */}
                          {order.usluga}
                        </td>
                        <td className='height'>{order.cijena} €</td>
                      </tr>
                    </tbody>
                  ))
                : null}
            </table>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default OrderHistory
