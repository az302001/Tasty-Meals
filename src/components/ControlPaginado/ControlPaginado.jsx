import React, { useState } from 'react';

const ControlPaginado = ({ totalPaginas, cambiarPagina }) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const handleClickPagina = (pagina) => {
    setPaginaActual(pagina);
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

  return <div className="flex items-center justify-center mb-24 mt-5">{generarPaginas()}</div>;
};

export default ControlPaginado;
