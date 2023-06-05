
// import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import Cards from '@/components/Cards/Cards';
// import { getFoods } from '@/redux/actions';
import { allProducts } from '@/redux/reducer/productsSlice';

import Layaout from '@/components/Layaout/Layaout';
import ControlPaginado from '@/components/ControlPaginado/ControlPaginado';

import { getFoods, orderByCategory, orderByName, orderByRating } from '@/redux/actions';

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  const foodFilter = useSelector(allProducts);
  console.log(foods);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 18; // Número de platos que vamos a renderizar (se generan "X" cant de pag en base a la cant de platos)

  const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));

  console.log(categories)

  const categoriesSet = new Set(categories);
  const uniqueCategories = Array.from(categoriesSet);
  const [order, setOrder] = useState('');

  let getfoodtoshow;

  if (foodFilter) {
    getfoodtoshow = foodFilter;
    // foodtoshow = foodFilter
  } else {
    getfoodtoshow = foods
    // foodtoshow = foods
  }



  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
    window.scrollTo(0, 0)
  };



  const handleSort = (e) => {
    const selectedOrder = e.target.value;
    setOrder(selectedOrder);
    dispatch(orderByName(selectedOrder));
  };

  const handleFilterCategories = (e) => {
    const selectedCategory = e.target.value;
    setOrder(selectedCategory);
    dispatch(orderByCategory(selectedCategory));
  };


  const handleFilterScore = (e) => {
    const selectRating = e.target.value;
    setOrder(selectRating);
    dispatch(orderByRating(selectRating));
  }



  const totalPaginas = Math.ceil(foods.length / elementosPorPagina);
  const alimentosPaginados = getfoodtoshow.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <div>
      <Layaout>
        <div>
          <div className='flex flex-col items-center justify-center '>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleFilterCategories} defaultValue={'DEFAULT'} className='bg-color3 w-52'>
                <option disabled value="DEFAULT">Categories</option>
                <option value="all">All categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleSort} name="alphabetical" defaultValue={'DEFAULT'} className='bg-color3 w-52'>
                <option disabled value="DEFAULT">Alphabetical</option>
                <option value="atoz">A to Z</option>
                <option value="ztoa">Z to A</option>
              </select>
            </div>
          </div>

          {/* <select onChange={e => handleFilterScore(e)} name="numerical" defaultValue={'DEFAULT'} >
            <option disabled value="DEFAULT">Score</option>
            <option value="MenorMayor">From Min to Max</option>
            <option value="MayorMenor">From Max to Min</option>
          </select> */}
          <Cards foods={alimentosPaginados} />

          {/* import { getFoods, orderByCategory, orderByName, orderByRating } from '@/redux/actions';
 import Cards from '@/components/Cards/Cards';

import SearchBar from '@/components/SearchBar/SearchBar';
 import Layaout from '@/components/Layaout/Layaout';
import { allProducts } from '@/redux/reducer/productsSlice';

 const Menu = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
    const dispatch = useDispatch();
    const foodFilter = useSelector(allProducts);
    const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));
    const categoriesSet = new Set(categories);
    const uniqueCategories = Array.from(categoriesSet);
    const [order, setOrder] = useState('');


    useEffect(() => {
        dispatch(getFoods());
    }, [dispatch]);

    const handleSort = (e) => {
        const selectedOrder = e.target.value;
        setOrder(selectedOrder);
        dispatch(orderByName(selectedOrder));
    };

    const handleFilterCategories = (e) => {
        const selectedCategory = e.target.value;
        setOrder(selectedCategory);
        dispatch(orderByCategory(selectedCategory));
    };


    const handleFilterScore = (e) => {
        const selectRating = e.target.value;
        setOrder(selectRating);
        dispatch(orderByRating(selectRating));
    }


    return (
        <div>
            <Layaout>
                <div>
                    <SearchBar />
                </div>
                <select onChange={handleSort} name="alphabetical" defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>

                <select onChange={handleFilterCategories} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Categories</option>
                    <option value="all">All categories</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select onChange={e => handleFilterScore(e)} name="numerical" defaultValue={'DEFAULT'} >
                    <option disabled value="DEFAULT">Score</option>
                    <option value="MenorMayor">From Min to Max</option>
                    <option value="MayorMenor">From Max to Min</option>
                </select>

                <div style={{ "marginTop": "2rem" }}>
                    <Cards foods={foodFilter} />
                </div>
            </Layaout> */}
        </div>
        <ControlPaginado
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
        <div>
        </div>
      </Layaout>
    </div>
  );
};

export default Menu;
