import React from 'react'
import Nadvar from './Nadvar/Nadvar'
import Footer from './Footer/Footer'

const Layaout = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenido de tu página */}
      <div className="sticky top-0 absolute z-10">
        <Nadvar/>
      </div>
      <div className="flex-grow ">{children}</div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Layaout