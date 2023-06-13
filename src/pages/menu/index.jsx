
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '@/components/Cards/Cards';
import { allProducts } from '@/redux/reducer/productsSlice';
import Layaout from '@/components/Layaout/Layaout';
import ControlPaginado from '@/components/ControlPaginado/ControlPaginado';
import { getFoods, orderByCategory, orderByName, orderByPrice, orderByRating, rangeForPrice } from '@/redux/actions';

const Menu = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  // const foods = useSelector(allProducts);
  const foodFilter = useSelector(allProducts);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 18;
  const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));


  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoriesSet = new Set(categories);
  const uniqueCategories = Array.from(categoriesSet);
  const [order, setOrder] = useState('');
  const [minPrice, setMinPrice] = useState(2);
  const [maxPrice, setMaxPrice] = useState(3);

  const getfoodtoshow = foodFilter || foods;

  useEffect(() => {
    dispatch(getFoods());
    setFiltroAplicado(false);
    setSelectedCategory('all');
  }, [dispatch]);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
    setFiltroAplicado(true);
    window.scrollTo(0, 0);
  };

  const handleSort = (e) => {
    const selectedOrder = e.target.value;
    setOrder(selectedOrder);
    dispatch(orderByName(selectedOrder));
  };

  const handleFilterCategories = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(orderByCategory(selectedCategory));
    setPaginaActual(1);
  };

  const handleFilterScore = (e) => {
    const selectRating = e.target.value;
    setOrder(selectRating);
    dispatch(orderByRating(selectRating));
  };

  const handleFilterPrice = () => {
    if (minPrice < 1) {
      alert("El rango mínimo de precio no puede ser menor que 1.");
    } else if (minPrice > maxPrice) {
      alert("El rango mínimo de precio no puede ser mayor que el rango máximo.");
    } else {
      if (minPrice === 1 && maxPrice === 2) {
        if (selectedCategory === 'all') {
          dispatch(getFoods()); // Obtener todos los productos si ambos inputs son 3 y no hay categoría seleccionada
        } else {
          dispatch(orderByCategory(selectedCategory));
        }
      } else {
        dispatch(rangeForPrice({ minPrice, maxPrice }));
      }
    }
  };

  const handleOrderByPrice = (e) => {
    const selectPrice = e.target.value;
    setOrder(selectPrice);
    dispatch(orderByPrice(selectPrice));
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
                placeholder={`Precio Minimo (${Math.min(...foods.map((food) => food.price))})`}
                value={minPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setMinPrice(value >= 1 ? value : 1)
                }}
              />
              <input
                type="number"
                placeholder="Precio Máximo"
                value={maxPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setMaxPrice(value >= 2 ? value : 2);
                }}
              />
              <button onClick={handleFilterPrice}>Filtrar por precio</button>
            </div>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleFilterCategories} value={selectedCategory} className='bg-color3 w-52'>
                <option hidden value="all">Todas las categorias</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleSort} name="alphabetical" defaultValue={'DEFAULT'} className='bg-color3 w-52'>
                <option hidden value="DEFAULT">Alfabeticamente</option>
                <option value="atoz">A hasta la Z</option>
                <option value="ztoa">Z hasta la A</option>
              </select>
            </div>

            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={handleFilterScore} name="numerical" defaultValue={'DEFAULT'} className='bg-color3 w-52'>
                <option hidden value="DEFAULT">Puntuacion</option>
                <option value="MenorMayor">De Min a Max</option>
                <option value="MayorMenor">De Max a Min</option>
              </select>
            </div>

            <div className='mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3'>
              <select onChange={e => handleOrderByPrice(e)} name="numerical" defaultValue={'DEFAULT'} className='bg-color3 w-52' >
                <option hidden value="DEFAULT">Precio</option>
                <option value="menor">De Menor precio</option>
                <option value="mayor">De Mayor precio</option>
              </select>
            </div>
          </div>
          {alimentosPaginados.length === 0 && <p>No tenemos productos con ese rango de precio.</p>}
          <Cards foods={alimentosPaginados} />
        </div>
        <ControlPaginado
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
          filtroAplicado={filtroAplicado}
        />
        <div></div>
      </Layaout>
    </div>
  );
};

export default Menu;
