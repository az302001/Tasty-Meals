import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cards from '@/components/Cards/Cards';
import { getFoods } from '@/redux/actions';
import SearchBar from '@/components/SearchBar/SearchBar';
import Layaout from '@/components/Layaout/Layaout';
import ControlPaginado from '@/components/ControlPaginado/ControlPaginado';

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 18; // Número de platos que vamos a renderizar (se generan "X" cant de pag en base a la cant de platos)

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
    window.scrollTo(0, 0)
  };

  const totalPaginas = Math.ceil(foods.length / elementosPorPagina);
  const alimentosPaginados = foods.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <div>
      <Layaout>
        <div>
          <SearchBar />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Cards foods={alimentosPaginados} />
        </div>
        <ControlPaginado
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      </Layaout>
    </div>
  );
};

export default Menu;