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
          className={`bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 mx-2 ${
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

  return <div className="flex items-center justify-center">{generarPaginas()}</div>;
};

export default ControlPaginado;
