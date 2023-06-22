import Layaout from "@/components/Layaout/Layaout";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AdminRoute from "@/components/AdminRoute/AdminRoute";
import { getTransactions, cleanDetailOrder } from "@/redux/actions";
import {
  ClipboardDocumentListIcon,
  XMarkIcon,
  CheckIcon,
  ArchiveBoxIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function Users() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const users = useSelector(({ products }) => products.users);
  const data = useMemo(() => users, [users]);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
          const userId = row.original.id;

          return (
            <button
              onClick={() => handleGetOrders(userId)}
              value="open"
              className="cursor-pointer"
            >
              <ClipboardDocumentListIcon class="h-6 w-6 text-color1" />
            </button>
          );
        },
      },
      {
        Header: "Eliminar Usuario",
        Cell: ({ row }) => {
          const userId = row.original.id;
          const userName = row.original.name;
          return (
            <button onClick={() => handleDeleteUser(userId, userName)}>
              <XCircleIcon class="h-6 w-6 text-red-900" />
            </button>
          );
        },
      },
    ],
    []
  );

  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar usuario",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = parseInt(id);
        const userName = name;
        axios
          .delete(`/api/Users?id=${userId}`)
          .then((response) => {
            // Swal.fire(
            //   "Estado actualizado",
            //   `El usuario ${userName} ha sido eliminado`,
            //   "success"
            // );
            setCurrentUserPage(0);
          })
          .catch((error) => {
            Swal.fire(
              "Estado actualizado",
              `El usuario ${userName} ha sido eliminado`,
              "success"
            );
          });
      }
    });
  };

  const userOrders = useSelector((state) => state.products.userTransactions);
  useEffect(() => {
    if (hasFetchedOrders) {
      if (userOrders.length > 0) {
        setModal(true);
      } else {
        Swal.fire(
          "Sin ordenes",
          "El usuario no tiene ninguna orden",
          "warning"
        );
      }
    }
  }, [hasFetchedOrders, userOrders]);
  const handleGetOrders = async (id) => {
    try {
      await dispatch(getTransactions(id));
      setHasFetchedOrders(true);
    } catch (error) {
      console.error(error);
    }
  };

  const ordersPerPage = 5;

  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const usersPerPage = 5;
  const [currentUserPage, setCurrentUserPage] = useState(0);
  const indexOfLastUser = (currentUserPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const selectedOrdersPage = selectedOrder?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: currentUsers });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cleanDetailOrder());
  }, [setModal]);

  const handleCloseModal = () => {
    setModal(false);
    setCurrentPage(0);
  };
  const [orderId, setOrderId] = useState();
  const showOrderDetails = (foodList, id) => {
    setOrderId(id);
    setSelectedOrder(foodList);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <AdminRoute>
        <Layaout>
          <section className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold text-color1 p-6 lg:text-3xl">
              LISTA DE USUARIOS
            </h1>

            <table
              {...getTableProps()}
              className="mb-20 text-center  lg:w-11/12"
            >
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white p-4 rounded-lg w-screen lg:w-4/6 top-10 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={handleCloseModal}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500 m-0" />
                </button>

                <h2 className="text-lg text-color1 text-center font-bold mb-4">
                  LISTA DE ORDENES
                </h2>
                <table className="w-full rounded-lg border-color1 text-center items-center content-center justify-center">
                  <thead>
                    <tr className="text-color1">
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        ID Orden
                      </th>
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        Estado
                      </th>
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        Costo
                      </th>
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        Detalle de orden
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentOrders.map((orden, index) => (
                      <tr
                        key={orden.id}
                        className="bg-white h-10 lg:h-20 text-center even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 font-semibold text-color1 border-solid border-2"
                      >
                        <td className="w-20">{orden.id}</td>
                        <td className="text-center w-20">
                          {orden.approved ? (
                            <div className="inline-flex">
                              <p className="font-semibold text-color1">
                                {" "}
                                Aprobada
                              </p>

                              <CheckIcon className="h-5 w-5 text-green-500 text-center" />
                            </div>
                          ) : (
                            <div className="inline-flex">
                              <p className="font-semibold text-red-800">
                                {" "}
                                Rechazada
                              </p>
                              <XMarkIcon className="h-5 w-5 text-red-500 text-center" />
                            </div>
                          )}
                        </td>
                        <td className="w-20">${orden.cost}</td>
                        <td className="w-20">
                          <button
                            onClick={() =>
                              showOrderDetails(orden.food, orden.id)
                            }
                            className="cursor-pointer text-blue-500"
                          >
                            <ArchiveBoxIcon class="h-6 w-6 text-color1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex text-center justify-center items-center mt-4">
                  <ReactPaginate
                    previousLabel={
                      userOrders.length > ordersPerPage ? (
                        <ArrowSmallLeftIcon className="text-center h-8 w-8 text-gray-500" />
                      ) : null
                    }
                    nextLabel={
                      userOrders.length > ordersPerPage ? (
                        <ArrowSmallRightIcon className="h-8 w-8 text-gray-500 " />
                      ) : null
                    }
                    breakLabel={"..."}
                    pageCount={Math.ceil(userOrders.length / ordersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName="flex"
                    subContainerClassName="pages pagination flex items-center space-x-2"
                    activeClassName="active text-color1 bg-color3"
                    previousClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                    nextClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                    disabledClassName="text-gray-300 cursor-not-allowed"
                    pageClassName="border bg-color1 border-gray-300 rounded-md px-3 py-1 hover:bg-color3 group cursor-pointer hover:text-color1"
                    pageLinkClassName="text-color3 font-semibold group-hover:text-color1"
                    activeLinkClassName="text-current"
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {showDetailsModal && selectedOrder && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white p-8 rounded-lg w-full lg:w-4/6 top-10 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={handleCloseDetailsModal}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500 m-0" />
                </button>

                <h2 className="text-lg text-color1 text-center font-bold mb-4">
                  DETALLES DE LA ORDEN {orderId}
                </h2>

                <table className="w-full rounded-lg border-color1 text-center items-center content-center justify-center">
                  <thead>
                    <tr className="bg-white h-10 lg:h-20 text-center even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 font-semibold text-color1 border-solid border-2">
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        Nombre plato
                      </th>
                      <th className="bg-color1 text-color3 h-16 text-center font-semibold text-lg">
                        Precio unidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrdersPage.map((food, index) => {
                      if (
                        selectedOrder.findIndex(
                          (item) => item.id === food.id
                        ) === selectedOrder.indexOf(food)
                      ) {
                        return (
                          <tr
                            key={food.id}
                            className="bg-white h-10 lg:h-20 text-center even:bg-gray-200 rounded-lg shadow-md mb-2 border-color1 font-semibold text-color1 border-solid border-2"
                          >
                            <td>{food.name}</td>
                            <td>${food.price}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>

                <div className="flex text-center justify-center items-center mt-4">
                  <ReactPaginate
                    previousLabel={
                      <ArrowSmallLeftIcon className="text-center h-8 w-8 text-gray-500" />
                    }
                    nextLabel={
                      <ArrowSmallRightIcon className="h-8 w-8 text-gray-500 " />
                    }
                    breakLabel={"..."}
                    pageCount={Math.ceil(selectedOrder.length / ordersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName="flex"
                    subContainerClassName="pages pagination flex items-center space-x-2"
                    activeClassName="active text-color1 bg-color3"
                    previousClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                    nextClassName="border bg-color3 border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                    disabledClassName="text-gray-300 cursor-not-allowed"
                    pageClassName="border bg-color1 border-gray-300 rounded-md px-3 py-1 hover:bg-color3 group cursor-pointer hover:text-color1"
                    pageLinkClassName="text-color3 font-semibold group-hover:text-color1"
                    activeLinkClassName="text-current"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center text-center justify-center ">
            <ReactPaginate
              previousLabel={
                users.length > usersPerPage ? (
                  <ArrowSmallLeftIcon className="text-center h-8 w-8 text-gray-500" />
                ) : null
              }
              nextLabel={
                users.length > usersPerPage ? (
                  <ArrowSmallRightIcon className="h-8 w-8 text-gray-500 " />
                ) : null
              }
              breakLabel={"..."}
              pageCount={Math.ceil(users.length / usersPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={({ selected }) => setCurrentUserPage(selected)}
              containerClassName="flex"
              subContainerClassName="pages pagination flex items-center space-x-2"
              activeClassName="active text-color1 bg-color3"
              disabledClassName="text-gray-300 cursor-not-allowed"
              pageClassName="border bg-color1 border-gray-300 rounded-md px-3 py-1 hover:bg-color3 group cursor-pointer hover:text-color1"
              pageLinkClassName="text-color3 font-semibold group-hover:text-color1"
              activeLinkClassName="text-current"
            />
          </div>
        </Layaout>
      </AdminRoute>
    </div>
  );
}
