import Layaout from "@/components/Layaout/Layaout";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import {
  ClipboardDocumentListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
export default function Users() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const users = useSelector(({ products }) => products.users);
  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Ordenes",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => setModal(true)}
              value="open"
              className="cursor-pointer"
            >
              <ClipboardDocumentListIcon class="h-6 w-6 text-color1" />
            </button>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    dispatch(getUsers());
    console.log(users);
  }, [dispatch]);

  useEffect(() => {
    console.log("Users actualizados:", users);
  }, [users]);

  return (
    <div>
      <Layaout>
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold text-color1 p-6 lg:text-3xl">
            LISTA DE USUARIOS
          </h1>
          <table {...getTableProps()} className="mb-20 text-center w-11/12">
            <thead className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
              {headerGroups.map((headerGroup) => {
                return (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="bg-white even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 border-solid border-2"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="w-20 h-20 text-color1 text-md lg:text-lg whitespace-normal text-center font-semibold"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        {modal ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg relative">
              <button
                className="absolute top-2 right-2  text-gray-500"
                onClick={() => setModal(false)}
              >
                <XMarkIcon class="h-6 w-6 text-gray-500 m-0" />
              </button>
              <h2 className="text-lg text-color1 font-bold mb-4">
                LISTA DE ORDENES DE{" "}
              </h2>
            </div>
          </div>
        ) : (
          ""
        )}
      </Layaout>
    </div>
  );
}
