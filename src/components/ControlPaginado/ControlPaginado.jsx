import React, { useState, useEffect } from "react";

const ControlPaginado = ({
  totalPaginas,
  cambiarPagina,
  paginaActual,
  filtroAplicado,
}) => {
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
          className={`bg-color1 font-poppins w-8 font-bold text-color3 p-1.5 mx-1 rounded-md ${
            paginaActual === i
              ? "bg-indigo-300 border-2 border-color1 font-poppins w-6 h-10 font-bold" // Clase para el color de texto deseado
              : ""
          }`}
          disabled={paginaActual === i}
        >
          {i}
        </button>
      );
    }
    return paginas;
  };

  return (
    <div className="flex items-center justify-center my-5">
      {generarPaginas()}
    </div>
  );
};

export default ControlPaginado;
