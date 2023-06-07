import React, { useState, useEffect } from 'react';

const ControlPaginado = ({ totalPaginas, cambiarPagina, paginaActual, filtroAplicado}) => {
  

  const handleClickPagina = (pagina) => {
    cambiarPagina(pagina);
  };

  const generarPaginas = () => {
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => handleClickPagina(i)}
          className={`bg-color1 hover:bg-purple-900 text-color3 font-manrope p-1.5 mx-2 rounded-md ${
            paginaActual === i ? 'bg-opacity-50' : ''
          }`}
          disabled={paginaActual === i}
        >
          {i}
        </button>
      );
    }
    return paginas;
  };


  return <div className="flex items-center justify-center my-5">{generarPaginas()}</div>;

 
  

};

export default ControlPaginado;
