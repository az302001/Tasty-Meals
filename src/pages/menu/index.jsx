

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '@/components/Cards/Cards';
import { allProducts } from '@/redux/reducer/productsSlice';
import Layaout from '@/components/Layaout/Layaout';
import ControlPaginado from '@/components/ControlPaginado/ControlPaginado';
import { getDiscounts, getFoods, orderByCategory, orderByName, orderByPrice, orderByRating, rangeForPrice } from '@/redux/actions';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const Menu = () => {
  const dispatch = useDispatch();

  // const foods = useSelector(allProducts)
  const foodFilter = useSelector(allProducts);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 15;




  const categories = useSelector((state) => state.products.foods.map((food) => food.Category.name));

  // const [previousRoutes, setPreviousRoutes] = useState([]);
  // const { data: session, status } = useSession();
  const router = useRouter();



  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");




  const categoriesSet = new Set(categories);
  const uniqueCategories = Array.from(categoriesSet);


  const [order, setOrder] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [initialreset, setReset] = useState("reset");
  const [showFilter, setShowFilter] = useState(false);


  const getfoodtoshow = foodFilter;

  useEffect(() => {
    dispatch(getFoods());
    setFiltroAplicado(true);
    setSelectedCategory("all");
  }, [dispatch, filtroAplicado]);

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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterPrice = () => {
    if (minPrice < 0) {
      alert("El rango mínimo de precio no puede ser menor que 0.");
      setMinPrice(0);
      return;
    } else if (minPrice >= maxPrice) {
      alert(
        "El rango mínimo de precio no puede ser mayor o igual que el rango máximo ."
      );

    } else {
      dispatch(rangeForPrice({ minPrice, maxPrice }));
      setPaginaActual(1);
    }
  };

  const handleOrderByPrice = (e) => {
    const selectPrice = e.target.value;
    setOrder(selectPrice);
    dispatch(orderByPrice(selectPrice));
  };


  const handleResetFilter = () => {
    setMinPrice(initialreset);
    setMaxPrice(initialreset);
    dispatch(rangeForPrice("reset"))
  };


  const handleDiscount = (e) => {
    const discount = e.target.checked;
    if (discount) {
      const productsWithDiscount = foodFilter.filter((food) => food.discount > 0);
      dispatch(getDiscounts(productsWithDiscount));
    } else {
      dispatch(getFoods());
    }
  };



  const totalPaginas = Math.ceil(getfoodtoshow.length / elementosPorPagina);
  const alimentosPaginados = getfoodtoshow.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );



  return (
    <div>
      <Layaout>
        <div>
          <div className="m-3">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="h-8 w-8 text-color1" />
            </button>
          </div>
          <div className='flex flex-col  lg:flex-row items-center justify-center gap-[1%]'>

            <div className="mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3 ">
              <select
                onChange={handleFilterCategories}
                value={selectedCategory}
                className="bg-color3 w-52 "
              >
                <option value="all">
                  Todas las categorias
                </option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category} >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3">
              <select
                onChange={handleSort}
                name="alphabetical"
                defaultValue={"DEFAULT"}
                className="bg-color3 w-52"
              >
                <option hidden value="DEFAULT">
                  Alfabeticamente
                </option>
                <option value="atoz">A hasta la Z</option>
                <option value="ztoa">Z hasta la A</option>
              </select>
            </div>

            <div className="mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3">
              <select
                onChange={handleFilterScore}
                name="numerical"
                defaultValue={"DEFAULT"}
                className="bg-color3 w-52"
              >
                <option hidden value="DEFAULT">
                  Puntuacion
                </option>
                <option value="MenorMayor">De Min a Max</option>
                <option value="MayorMenor">De Max a Min</option>
              </select>
            </div>

            <div className="mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3">
              <select
                onChange={(e) => handleOrderByPrice(e)}
                name="numerical"
                defaultValue={"DEFAULT"}
                className="bg-color3 w-52"
              >
                <option hidden value="DEFAULT">
                  Precio
                </option>
                <option value="menor">De Menor precio</option>
                <option value="mayor">De Mayor precio</option>
              </select>
            </div>


            <div className='mt-2 text-lg  bg-color3  border-2 border-solid rounded-md p-0.5 pl-2 border-color1 w-[69%] lg:w-[18%] md:w-[31%]  text-center' >
              <button onClick={toggleFilter} className=' md:mr-[0] lg:mr-[0] '>
                Filtrar por precio
              </button>

              {showFilter && (
                <div className=' rounded-md   text-lg bg-color3 w-[100%]  '>
                  <input
                    className='md:w-[25%] lg:w-[22%] w-[20%] text-center lg:mr-[3%] ml-[1%]'
                    type='number'
                    placeholder='Min'
                    value={minPrice}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setMinPrice(value);
                    }}
                  />

                  <input
                    className='md:w-[25%] lg:w-[22%] w-[20%] text-center mr-[3%]'
                    type='number'
                    placeholder='Max'
                    value={maxPrice}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setMaxPrice(value);
                    }}
                  />
                  <button onClick={handleResetFilter} type='button' className='text-center lg:w-[22%] border-2 border-solid border-color1' >Reset</button>
                  <button onClick={handleFilterPrice} type='button'  className=' lg:w-[20%] border-2 border-solid border-color1 ml-[1%]'>Filtrar</button>
                </div>
              )}
            </div>

            <div className="mt-2 border-2 border-solid rounded-md p-0.5 pl-2 border-color1 text-lg bg-color3 gap-1 flex">
              <input type="checkbox" className="bg-color3" id="discount" onChange={handleDiscount} />
              <label htmlFor="discount">Descuentos</label>
            </div>

          </div>
          {alimentosPaginados.length === 0 && (
            <p>No tenemos productos con ese rango de precio.</p>
          )}
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
