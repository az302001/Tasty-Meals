
import React, { useEffect, useState } from 'react';
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

// import { getFoods, orderByCategory, orderByName, orderByRating } from '@/redux/actions';
// import Cards from '@/components/Cards/Cards';

// import SearchBar from '@/components/SearchBar/SearchBar';
// import Layaout from '@/components/Layaout/Layaout';
// import { allProducts } from '@/redux/reducer/productsSlice';

// const Menu = () => {
//     // const dispatch = useDispatch();
//     // const foods = useSelector((state) => state.foods);
//     const dispatch = useDispatch();
//     const foodFilter = useSelector(allProducts);
//     const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));
//     const categoriesSet = new Set(categories);
//     const uniqueCategories = Array.from(categoriesSet);
//     const [order, setOrder] = useState('');


//     useEffect(() => {
//         dispatch(getFoods());
//     }, [dispatch]);

//     const handleSort = (e) => {
//         const selectedOrder = e.target.value;
//         setOrder(selectedOrder);
//         dispatch(orderByName(selectedOrder));
//     };

//     const handleFilterCategories = (e) => {
//         const selectedCategory = e.target.value;
//         setOrder(selectedCategory);
//         dispatch(orderByCategory(selectedCategory));
//     };


//     const handleFilterScore = (e) => {
//         const selectRating = e.target.value;
//         setOrder(selectRating);
//         dispatch(orderByRating(selectRating));
//     }


//     return (
//         <div>
//             <Layaout>
//                 <div>
//                     <SearchBar />
//                 </div>
//                 <select onChange={handleSort} name="alphabetical" defaultValue={'DEFAULT'}>
//                     <option disabled value="DEFAULT">Alphabetical</option>
//                     <option value="atoz">A to Z</option>
//                     <option value="ztoa">Z to A</option>
//                 </select>

//                 <select onChange={handleFilterCategories} defaultValue={'DEFAULT'}>
//                     <option disabled value="DEFAULT">Categories</option>
//                     <option value="all">All categories</option>
//                     {uniqueCategories.map((category) => (
//                         <option key={category} value={category}>{category}</option>
//                     ))}
//                 </select>

//                 <select onChange={e => handleFilterScore(e)} name="numerical" defaultValue={'DEFAULT'} >
//                     <option disabled value="DEFAULT">Score</option>
//                     <option value="MenorMayor">From Min to Max</option>
//                     <option value="MayorMenor">From Max to Min</option>
//                 </select>

//                 <div style={{ "marginTop": "2rem" }}>
//                     <Cards foods={foodFilter} />
//                 </div>
//             </Layaout>

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
