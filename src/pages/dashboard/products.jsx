import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFoods, orderByCategory, orderByName } from "@/redux/actions";
import Link from "next/link";
import ControlPaginado from "@/components/ControlPaginado/ControlPaginado";
import Layaout from "@/components/Layaout/Layaout";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterByCategory from "@/components/Filtros/filterByCategory";

const columnsToExclude = [
  "id",
  "description",
  "image",
  "categoryId",
  "discount",
  "rating",
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
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="p-2 text-xl">MODIFICAR PLATOS</h1>
        <FilterByCategory onChange={handleChange} />

        <Link href="/dashboard/create">
          <button className="self-end p-1 bg-blue-400 shadow-md font-sans text-sm text-color3">
            + Nuevo Producto
          </button>
        </Link>

        <div className="mb-20">
          <table className="mb-10">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="text-left">
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
                <th className="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="m-10">
              {alimentosPaginados.map((food, index) => (
                <tr
                  key={index}
                  className="bg-white rounded-lg shadow-md mb-2 border-color3 border-solid border-2"
                >
                  <td className="w-20 whitespace-normal">
                    {String(food.name)}
                  </td>
                  <td className="w-20 font-bold">{String(food.price)}</td>
                  <td className="w-20">{String(food.Category.name)}</td>
                  <td className="w-20 border-color1 border-solid">
                    <div className="flex flex-col">
                      <div className="bg-blue-400 p-2 shadow-md font-sans text-sm text-color3">
                        <Link href={`/dashboard/update/${food.id}`}>
                          <a>Modificar</a>
                        </Link>
                      </div>
                      <div className="bg-red-400 p-2 shadow-md font-sans text-sm text-color3">
                        <a>Eliminar</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
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
      </div>
    </Layaout>
  );
}
