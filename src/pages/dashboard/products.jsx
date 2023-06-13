import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoods, orderByCategory, orderByPrice } from "@/redux/actions";
import Link from "next/link";
import Layaout from "@/components/Layaout/Layaout";
import FilterByCategory from "@/components/Filtros/filterByCategory";
import ReactSearchInput from "react-search-input";
import AboutUs from "@/pages/about";
import axios from "axios";
import {
  PencilSquareIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { remove as removeDiacritics } from "diacritics";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const columnsToExclude = [
  "id",
  "description",
  "image",
  "categoryId",
  "discount",
  "rating",
  "quantity",
  "disabled",
];

export default function Products() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  const foodsFiltered = useSelector((state) => state.products.foodFilter);
  const [paginaActual, setPaginaActual] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("mayor");
  const elementosPorPagina = 18;

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  useEffect(() => {
    const filteredColumns =
      foods.length > 0
        ? Object.keys(foods[0]).filter((key) => !columnsToExclude.includes(key))
        : [];
    setColumns(filteredColumns);
  }, [foods]);

  useEffect(() => {
    const alimentosFiltrados = foodsFiltered || foods;

    const alimentosFiltradosPorBusqueda = alimentosFiltrados.filter((food) =>
      removeDiacritics(food.name.toLowerCase()).includes(
        removeDiacritics(searchInput.toLowerCase())
      )
    );

    setAlimentosPaginados(alimentosFiltradosPorBusqueda);
    setPaginaActual(0);
  }, [foods, foodsFiltered, searchInput, ordenPrecio]);

  const [columns, setColumns] = useState([]);
  const [alimentosPaginados, setAlimentosPaginados] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(orderByCategory(value));
    if (value === "" || value === "todos") dispatch(getFoods());
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const handlePageChange = (selectedPage) => {
    setPaginaActual(selectedPage.selected);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (event) => {
    const { name, value } = event.currentTarget;
    setOrdenPrecio(value);
    dispatch(orderByPrice(value));
  };

  return (
    <Layaout>
      <div className="flex flex-col items-center p-4 w-full">
        <h1 className="text-xl font-semibold text-color1 p-6 lg:text-3xl">
          MODIFICAR PLATOS
        </h1>
        <section className="flex items-center space-x-4">
          <ReactSearchInput
            className="text-center justify-center items-center border-solid border-2 p-1 placeholder-red-500 text-red-500 text-sm"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Buscar alimentos"
          />
          <FilterByCategory onChange={handleChange} />
        </section>
      </div>
      {alimentosPaginados.length === 0 ? (
        <h2 className="text-xl p-10 font-semibold text-color1 text-center">
          No se encontraron alimentos
        </h2>
      ) : (
        <div className="mb-20 rounded-lg flex flex-col items-center">
          <table className="w-11/12 mb-10 rounded-lg border-color1">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    className="bg-color1 text-color3 h-16 text-center font-semibold text-lg"
                    key={index}
                  >
                    {column === "name" ? (
                      "Nombre"
                    ) : column === "price" ? (
                      <div className="flex items-center justify-center">
                        Precio
                        <div className="flex flex-col ml-2">
                          {ordenPrecio === "mayor" ? (
                            <button
                              name="order"
                              value="menor"
                              onClick={handleClick}
                              className="font-bold"
                            >
                              <ArrowUpIcon className="h-5 w-5 text-color3" />
                            </button>
                          ) : (
                            <button
                              name="order"
                              value="mayor"
                              onClick={handleClick}
                            >
                              <ArrowDownIcon className="h-5 w-5 text-color3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : column === "Category" ? (
                      "Categoría"
                    ) : column === "discount" ? (
                      "Descuento"
                    ) : column === "rating" ? (
                      "Rating"
                    ) : (
                      column
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="m-10">
              {alimentosPaginados
                .slice(
                  paginaActual * elementosPorPagina,
                  (paginaActual + 1) * elementosPorPagina
                )
                .map((food, index) => {
                  const categoryName = String(food.Category.name);
                  return (
                    <tr
                      key={index}
                      className="bg-white even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 border-solid border-2"
                    >
                      <td className="w-20 text-color1 text-lg whitespace-normal text-center font-semibold">
                        {String(food.name)}
                      </td>
                      <td className="w-20 text-center text-color1 font-bold">
                        ${String(food.price)}
                      </td>
                      <td className="w-20 text-center">
                        <div className="flex items-center">
                          <span className="flex-grow text-center text-lg font-semibold text-color1">
                            {categoryName}
                          </span>
                          <div className="ml-4">
                            <div className="w-10 p-2 shadow-md cursor-pointer font-sans text-sm border-none text-center">
                              <Link href={`/dashboard/update/${food.id}`}>
                                <PencilSquareIcon className="h-6 w-6 text-color1 border-none" />
                              </Link>
                            </div>
                            <div className="p-2 w-10 shadow-md font-sans text-sm text-color1 text-center cursor-pointer">
                              <a
                                onClick={() => {
                                  Swal.fire({
                                    title: "¿Estás seguro?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Sí, cambiar estado",
                                    cancelButtonText: "Cancelar",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      const updatedFood = {
                                        id: food.id,
                                        disabled: !food.disabled,
                                      };

                                      axios
                                        .patch(
                                          `/api/Products/${food.id}`,
                                          updatedFood
                                        )
                                        .then((response) => {
                                          Swal.fire(
                                            "Estado actualizado",
                                            `El plato ${food.name} ha cambiado su estado`,
                                            "success"
                                          );
                                          dispatch(getFoods());
                                        })
                                        .catch((error) => {
                                          Swal.fire(
                                            "Error",
                                            "No se pudo cambiar el estado del elemento",
                                            "error"
                                          );
                                          console.error(
                                            "Error al cambiar el estado del elemento:",
                                            error
                                          );
                                        });
                                    }
                                  });
                                }}
                              >
                                {food.disabled ? (
                                  <EyeIcon className="h-6 w-6 text-gray-500 text-center" />
                                ) : (
                                  <EyeSlashIcon class="h-6 w-6 text-gray-500" />
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-center">
            <ReactPaginate
              previousLabel={
                <ArrowSmallLeftIcon className="h-6 w-6 text-gray-500" />
              }
              nextLabel={
                <ArrowSmallRightIcon className="h-6 w-6 text-gray-500 " />
              }
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(
                alimentosPaginados.length / elementosPorPagina
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="pagination flex justify-center"
              subContainerClassName="pages pagination flex items-center space-x-2"
              activeClassName="active text-color1 bg-color3"
              previousClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
              nextClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
              disabledClassName="text-gray-300 cursor-not-allowed"
              pageClassName="border bg-color1 border-gray-300 rounded-md px-3 py-1 hover:bg-color3 group cursor-pointer hover:text-color1"
              pageLinkClassName="text-color3 font-semibold group-hover:text-color1"
              activeLinkClassName="text-color1"
            />
          </div>
        </div>
      )}
    </Layaout>
  );
}
