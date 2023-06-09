import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoods, orderByCategory, orderByName } from "@/redux/actions";
import Link from "next/link";
import ControlPaginado from "@/components/ControlPaginado/ControlPaginado";
import Layaout from "@/components/Layaout/Layaout";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterByCategory from "@/components/Filtros/filterByCategory";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
  const [paginaActual, setPaginaActual] = useState(1);
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
    const alimentosPaginados = alimentosFiltrados.slice(
      (paginaActual - 1) * elementosPorPagina,
      paginaActual * elementosPorPagina
    );
    setAlimentosPaginados(alimentosPaginados);
  }, [foods, foodsFiltered, paginaActual]);

  const [columns, setColumns] = useState([]);
  const [alimentosPaginados, setAlimentosPaginados] = useState([]);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(orderByCategory(value));
    if (value === "") dispatch(getFoods());
    setPaginaActual(1);
  };

  return (
    <Layaout>
      <div className="flex flex-col justify-center p-4 w-full items-center align-center justify-self-center place-content-center">
        <h1 className="p-2 text-xl">MODIFICAR PLATOS</h1>

        <section className="grid grid-flow-row">
          <div className="grid-flow-dense">
            <FilterByCategory onChange={handleChange} />
          </div>
          <Link href="/dashboard/create">
            <button className="grid-flow-row grid-rows-1 p-1 m-2 bg-color1 shadow-md font-sans text-sm text-color3">
              + Nuevo producto
            </button>
          </Link>
        </section>
      </div>
      <div className="mb-20 rounded-lg flex flex-col items-center ">
        <table className="mb-10 rounded-lg w-11/12">
          <thead className="rounded-lg">
            <tr>
              {columns.map((column, index) => (
                <th
                  className="bg-color1 text-color3 h-10 text-center"
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
            {alimentosPaginados.map((food, index) => {
              const categoryName = String(food.Category.name);
              return (
                <tr
                  key={index}
                  className="bg-white rounded-lg shadow-md mb-2 border-color3 border-solid border-2"
                >
                  <td className="w-20 whitespace-normal">
                    {String(food.name)}
                  </td>
                  <td className="w-20 text-center font-bold">
                    {String(food.price)}
                  </td>
                  <td className="w-20 text-center">
                    <div className="flex items-center">
                      <span className="flex-grow text-center">
                        {categoryName}
                      </span>
                      <div className="ml-4">
                        {/* Icono de Modificar */}
                        <div className="w-10 bg-color1 p-2 shadow-md font-sans text-sm text-color3 text-center">
                          <Link href={`/dashboard/update/${food.id}`}>
                            <PencilSquareIcon className="h-6 w-6 text-color3" />
                          </Link>
                        </div>
                        {/* Icono de Eliminar */}
                        <div className="bg-red-400 p-2 w-10 shadow-md font-sans text-sm text-color3 text-center cursor-pointer">
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
                            <TrashIcon className="h-6 w-6 text-color3" />
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
        <ControlPaginado
          paginaActual={paginaActual}
          totalPaginas={Math.ceil(
            (foodsFiltered || foods).length / elementosPorPagina
          )}
          cambiarPagina={cambiarPagina}
        />
      </div>
    </Layaout>
  );
}
