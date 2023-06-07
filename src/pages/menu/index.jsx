
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '@/components/Cards/Cards';
import { allProducts } from '@/redux/reducer/productsSlice';
import Layaout from '@/components/Layaout/Layaout';
import ControlPaginado from '@/components/ControlPaginado/ControlPaginado';
import { getFoods, orderByCategory, orderByName, orderByRating, rangeForPrice } from '@/redux/actions';

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  const foodFilter = useSelector(allProducts);
  console.log(foods);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 18;
  const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));




  const [filtroAplicado, setFiltroAplicado] = useState(false);
  


  const categoriesSet = new Set(categories);
  const uniqueCategories = Array.from(categoriesSet);
  const [order, setOrder] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState('');

  let getfoodtoshow = foodFilter || foods;

  useEffect(() => {
    dispatch(getFoods());
    setFiltroAplicado(false);
  }, [dispatch]);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
    setFiltroAplicado(true);
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
    setPaginaActual(1);
  };

  const handleFilterScore = (e) => {
    const selectRating = e.target.value;
    setOrder(selectRating);
    dispatch(orderByRating(selectRating));
  }

  const handleFilterPrice = () => {
    if (minPrice < 0) {
      setMinPrice(0);
      alert("El rango mínimo de precio no puede ser negativo. Se estableció en cero.");
    } else if (minPrice > maxPrice) {
      alert("El rango mínimo de precio no puede ser mayor que el rango máximo.");
    } else {
      if (minPrice === 0 && maxPrice === 0) {
        dispatch(getFoods()); // Obtener todos los productos si ambos inputs son 0
      } else {
        dispatch(rangeForPrice({ minPrice, maxPrice }));
      }
    }
  }

  const totalPaginas = Math.ceil(getfoodtoshow.length / elementosPorPagina);
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
              <input
                type="number"
                placeholder="Precio Minimo"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="Precio Maximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <button onClick={handleFilterPrice}>Filtrar</button>
            </div>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleFilterCategories} defaultValue={'DEFAULT'} className='bg-color3 w-52'>
              <option disabled value="DEFAULT">Categorias</option>
                <option value="all">Todas las categorias</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleSort} name="alphabetical" defaultValue={'DEFAULT'} className='bg-color3 w-52'>
                <option disabled value="DEFAULT">Alfabeticamente</option>
                <option value="atoz">A hasta la Z</option>
                <option value="ztoa">Z hasta la A</option>
              </select>
            </div>
          </div>
          <select onChange={e => handleFilterScore(e)} name="numerical" defaultValue={'DEFAULT'} >
            <option disabled value="DEFAULT">Score</option>
            <option value="MenorMayor">From Min to Max</option>
            <option value="MayorMenor">From Max to Min</option>
          </select>
          {getfoodtoshow.length === 0 && <p>No hay comidas con ese precio.</p>}
          <Cards foods={alimentosPaginados} />
        </div>
        <ControlPaginado
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
          filtroAplicado={filtroAplicado}
        />
        <div>
        </div>
      </Layaout>
    </div>
  );
};

export default Menu;
