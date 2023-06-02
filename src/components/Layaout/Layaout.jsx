import React from 'react'
import Nadvar from './Nadvar/Nadvar'
import Footer from './Footer/Footer'

const Layaout = ({ children }) => {
  return (
    <div>
      <Nadvar />
      {/* aqui tu logica para que vallan el body ejemplo: {childer} o algo asi toca investigar */}
      {children}
      <Footer />
    </div>
  )
}

export default Layaout