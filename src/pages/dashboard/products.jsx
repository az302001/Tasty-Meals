import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoods, orderByCategory, orderByName } from "@/redux/actions";
import Link from "next/link";
import Layaout from "@/components/Layaout/Layaout";
import FilterByCategory from "@/components/Filtros/filterByCategory";
import ReactSearchInput from "react-search-input";
import axios from "axios";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
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
];

export default function Products() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);
  const foodsFiltered = useSelector((state) => state.products.foodFilter);
  const [paginaActual, setPaginaActual] = useState(0);
  const [searchInput, setSearchInput] = useState("");
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
  }, [foods, foodsFiltered, searchInput]);

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

  const handleSearch = () => {
    const formattedTerm = removeDiacritics(searchInput.toLowerCase());
    const alimentosFiltrados = foodsFiltered || foods;
    const alimentosFiltradosPorBusqueda = alimentosFiltrados.filter((food) =>
      removeDiacritics(food.name.toLowerCase()).includes(formattedTerm)
    );
    setAlimentosPaginados(alimentosFiltradosPorBusqueda);
    setPaginaActual(0);
  };

  const handlePageChange = (selectedPage) => {
    setPaginaActual(selectedPage.selected);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layaout>
      <div className="flex flex-col justify-center p-4 w-full items-center align-center justify-self-center place-content-center">
        <h1 className="p-2 text-xl font-semibold text-color1  lg:text-3xl">
          MODIFICAR PLATOS
        </h1>

        <section className="inline-flex items-center">
          <ReactSearchInput
            className="text-center border-solid border-2"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Buscar alimentos"
          />
          <div>
            <FilterByCategory onChange={handleChange} />
          </div>
        </section>
      </div>
      {alimentosPaginados.length === 0 ? (
        <h2 className="text-xl p-10 font-semibold text-color1 text-center">
          No se encontraron alimentos
        </h2>
      ) : (
        <div className="mb-20 rounded-lg flex flex-col items-center">
          <table className="mb-10 rounded-lg w-11/12">
            <thead className="rounded-lg">
              <tr>
                {columns.map((column, index) => (
                  <th
                    className="bg-color1 text-color3 h-16 text-center font-semibold text-lg"
                    key={index}
                  >
                    {column === "name"
                      ? "Nombre"
                      : column === "price"
                      ? "Precio"
                      : column === "Category"
                      ? "Categoría"
                      : column === "discount"
                      ? "Descuento"
                      : column === "rating"
                      ? "Rating"
                      : column}
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
                      className="bg-white rounded-lg shadow-md mb-2 border-color3 border-solid border-2"
                    >
                      <td className="w-20 whitespace-normal text-center font-semibold">
                        {String(food.name)}
                      </td>
                      <td className="w-20 text-center font-bold">
                        {String(food.price)}
                      </td>
                      <td className="w-20 text-center">
                        <div className="flex items-center">
                          <span className="flex-grow text-center text-lg font-semibold text-color1">
                            {categoryName}
                          </span>
                          <div className="ml-4">
                            {/* Icono de Modificar */}
                            <div className="w-10  p-2 shadow-md cursor-pointer font-sans text-sm border-none text-center">
                              <Link href={`/dashboard/update/${food.id}`}>
                                <PencilSquareIcon className="h-6 w-6 text-color1 border-none" />
                              </Link>
                            </div>
                            {/* Icono de Eliminar */}
                            <div className="p-2 w-10 shadow-md font-sans text-sm text-color1 text-center cursor-pointer">
                              <a
                                onClick={() => {
                                  Swal.fire({
                                    title: "¿Estás seguro?",
                                    text: "Esta acción no se puede deshacer",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Sí, eliminar",
                                    cancelButtonText: "Cancelar",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      axios
                                        .delete(
                                          `http://localhost:3000/api/Products/${food.id}`
                                        )
                                        .then((response) => {
                                          Swal.fire(
                                            "Eliminado",
                                            `El plato ${food.name} ha sido eliminado`,
                                            "success"
                                          );
                                          dispatch(getFoods());
                                        })
                                        .catch((error) => {
                                          Swal.fire(
                                            "Error",
                                            "No se pudo eliminar el elemento",
                                            "error"
                                          );
                                          console.error(
                                            "Error al eliminar el elemento:",
                                            error
                                          );
                                        });
                                    }
                                  });
                                }}
                              >
                                <TrashIcon className="h-6 w-6 text-red-700" />
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
                <ArrowSmallRightIcon className="h-6 w-6 text-gray-500" />
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
              activeClassName="active"
              previousClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
              nextClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
              disabledClassName="text-gray-300 cursor-not-allowed"
              pageClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
              pageLinkClassName="text-blue-500"
              activeLinkClassName="bg-blue-200 text-white"
            />
          </div>
        </div>
      )}
    </Layaout>
  );
}
