import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoods, orderByCategoryAdmin, orderByPrice } from "@/redux/actions";
import Link from "next/link";
import Layaout from "@/components/Layaout/Layaout";
import FilterByCategory from "@/components/Filtros/filterByCategory";
import ReactSearchInput from "react-search-input";
import axios from "axios";

import {
  PencilSquareIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { remove as removeDiacritics } from "diacritics";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import AdminRoute from "@/components/AdminRoute/AdminRoute";

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
  const [paginaActual, setPaginaActual] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("mayor");
  const [sortedFoods, setSortedFoods] = useState();
  const elementosPorPagina = 18;

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  useEffect(() => {
    console.log(foods);
  }, [foods]);

  useEffect(() => {
    const filteredColumns =
      foods.length > 0
        ? Object.keys(foods[0]).filter((key) => !columnsToExclude.includes(key))
        : [];
    setColumns(filteredColumns);
  }, [foods, valueFilter]);

  useEffect(() => {
    const alimentosFiltrados = foods.sort((a, b) => a.id - b.id);

    const alimentosFiltradosPorBusqueda = alimentosFiltrados.filter((food) =>
      removeDiacritics(food.name.toLowerCase()).includes(
        removeDiacritics(searchInput.toLowerCase())
      )
    );

    setAlimentosPaginados(alimentosFiltradosPorBusqueda);
    setPaginaActual(0);
  }, [foods, searchInput, ordenPrecio]);

  const [columns, setColumns] = useState([]);
  const [alimentosPaginados, setAlimentosPaginados] = useState([]);
  const [valueFilter, setValueFilter] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    setValueFilter(value);
    dispatch(orderByCategoryAdmin(value));
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
    <AdminRoute>
      <Layaout>
        <div className="flex flex-col items-center p-4 w-full">
          <h1 className="text-xl font-semibold text-color1 p-6 lg:text-3xl">
            MODIFICAR PLATOS
          </h1>
          <section className="flex items-center text-center space-x-4">
            <ReactSearchInput
              className="text-center justify-center items-center border-solid border-2 p-1 placeholder-red-500 text-color1 text-sm"
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
                                            `/api/Admin/disabled/`,
                                            updatedFood
                                          )
                                          .then((response) => {
                                            if (food.disabled) {
                                              Swal.fire(
                                                "Estado actualizado",
                                                `El plato ${food.name} ha sido habilitado`,
                                                "success"
                                              );
                                            } else {
                                              Swal.fire(
                                                "Estado actualizado",
                                                `El plato ${food.name} ha sido deshabilitado`,
                                                "success"
                                              );
                                            }
                                            dispatch(getFoods())
                                              .then(() => {
                                                if (valueFilter) {
                                                  dispatch(
                                                    orderByCategoryAdmin(
                                                      valueFilter
                                                    )
                                                  );
                                                }
                                              })
                                              .catch((error) => {
                                                Swal.fire(
                                                  "Error",
                                                  "No se pudo cambiar el estado del elemento",
                                                  "error"
                                                );
                                              });
                                          })
                                          .catch((error) => {
                                            Swal.fire(
                                              "Error",
                                              "No se pudo cambiar el estado del elemento",
                                              "error"
                                            );
                                          });
                                      }
                                    });
                                  }}
                                >
                                  {food.disabled ? (
                                    <EyeIcon className="h-6 w-6 text-green-500 text-center" />
                                  ) : (
                                    <EyeSlashIcon className="h-6 w-6 text-red-900" />
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
                  alimentosPaginados.length > elementosPorPagina ? (
                    <ArrowSmallLeftIcon className="text-center h-8 w-8 text-gray-500" />
                  ) : null
                }
                nextLabel={
                  alimentosPaginados.length > elementosPorPagina ? (
                    <ArrowSmallRightIcon className="h-8 w-8 text-gray-500 " />
                  ) : null
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
                disabledClassName="text-gray-300 cursor-not-allowed"
                pageClassName="border bg-color1 border-gray-300 rounded-md px-3 py-1 hover:bg-color3 group cursor-pointer hover:text-color1"
                pageLinkClassName="text-color3 font-semibold group-hover:text-color1"
                activeLinkClassName="text-current"
              />
            </div>
          </div>
        )}
      </Layaout>
    </AdminRoute>
  );
}
