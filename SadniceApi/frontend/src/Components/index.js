import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../Screens/Home'
import Signin from '../Screens/Signin'
import Register from '../Screens/Register'
import NoveSadnice from '../Screens/NoveSadnice'
import NoveUsluge from '../Screens/NoveUsluge'
import Basket from '../Screens/Basket'
// import Navigacija from "./Navigacija";
import ShopSadnica from '../Screens/ShopSadnica'
import ShopUsluga from '../Screens/ShopUsluga'
import Povijest from '../Screens/Povijest'
import ProtectedRouters from './ProtectedRouters'
import Sadnica from '../Screens/Sadnica'
import Usluga from '../Screens/Usluga'
import EditUsluga from '../Screens/EditUsluga'
import EditSadnica from '../Screens/EditSadnica'
const index = () => {
  return (
    <Router>
      <Routes></Routes>
      <Routes>
        <Route exacth path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRouters />}>
          <Route path='/novesadnice' element={<NoveSadnice />} />
          <Route path='/noveusluge' element={<NoveUsluge />} />
        </Route>

        {/* <Route path="/usluge" element={<Usluga />} /> */}
        <Route path='/korpa/sadnica' element={<ShopSadnica />} />
        <Route path='/korpa/usluga' element={<ShopUsluga />} />
        <Route path='/povijest' element={<Povijest />} />

        <Route path='/korpa' element={<Basket />} />

        <Route path='/sadnica/:id' element={<Sadnica />} />
        <Route path='/usluga/:id' element={<Usluga />} />
        <Route path='/uredi/sadnica/:id' element={<EditSadnica />} />
        <Route path='/uredi/usluga/:id' element={<EditUsluga />} />
      </Routes>
    </Router>
  )
}

export default index
