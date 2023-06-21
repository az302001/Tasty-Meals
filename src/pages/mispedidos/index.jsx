import Layaout from "@/components/Layaout/Layaout";
import { createReview, getTransactions, updateRating } from "@/redux/actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";

export default function index() {
  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const transactions = useSelector((state) => state.products.userTransactions);
  const dispatch = useDispatch();
  const userId = session?.user?.id || userData?.data?.id;
  const [showModal, setShowModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(1);

  useEffect(() => {
    if (userId) {
      dispatch(getTransactions(userId));
    }
  }, [userId]);

  const showOrderDetails = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };
  const handleCommentarySubmit = async () => {
    try {

      if (comment.length < 3 || comment.length > 100) {
        Swal.fire({
          icon: "error",
          title: "Error al enviar la reseña",
          text: "El comentario debe tener entre 3 y 100 caracteres.",
        });
        return;
      }

      await dispatch(
        createReview({
          foodId: selectedDish.id,
          comentario: comment,
          rating: userRating,
          userId,
        })
      );
      dispatch(updateRating(selectedDish.id))
      // Mostrar la alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Reseña enviada",
        text: "¡Gracias por dejar tu comentario!",
      });

      setShowModal(false);
      setSelectedDish(null);
      setComment("");
      setUserRating(1);
    } catch (error) {
      // Mostrar la alerta de error
      Swal.fire({
        icon: "error",
        title: "Error al enviar la reseña",
        text: "Ya has dejado una reseña sobre este producto",
      });
    }
  };
  return (
    <Layaout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-medium mt-5 mb-8 text-center">
          Pedidos anteriores
        </h1>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div className="m-4">
              {transaction.food.map((product) => (
                <article
                  className="flex items-start space-x-6 p-4 border-2 border-gray-300"
                  key={product.id}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width="88"
                    height="88"
                    className="flex-none rounded-md bg-slate-100"
                  />
                  <div className="min-w-0 relative flex-auto">
                    {transaction.approved ? (
                      <p
                        className="text-green-700 font-semibold uppercase"
                        style={{ fontSize: "13px" }}
                      >
                        Entregado
                      </p>
                    ) : (
                      <p
                        className="text-red-700 font-medium uppercase"
                        style={{ fontSize: "13px" }}
                      >
                        Cancelado
                      </p>
                    )}
                    <h2 className="font-semibold text-slate-900 truncate pr-20">
                      {product.name}
                    </h2>
                    <dl className="mt-0 flex flex-wrap text-sm leading-6 font-medium">
                      <div>
                        <dd className="text-gray-500">
                          ${product.price * product.quantity} -{" "}
                          {product.quantity}{" "}
                          {product.quantity === 1 ? "Producto" : "Productos"}
                        </dd>
                      </div>
                    </dl>

                    {transaction.approved && (
                      <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                          onClick={() => showOrderDetails(product)}
                        >
                          Dejar comentario
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h2 className="mt-5 text-2xl">No tienes pedidos realizados.</h2>
          </div>
        )}
        {showModal && selectedDish && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-8 rounded-lg w-full lg:w-4/6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => {
                  setShowModal(false);
                  setSelectedDish(null);
                  setComment("");
                  setUserRating(1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h2 className="text-lg text-color1 text-center font-bold mb-4">
                Nombre del plato: {selectedDish.name}
              </h2>

              <div className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                <textarea
                  className="w-full px-4 py-2 mb-4 text-gray-700 border rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Escribe tu comentario"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Rating
                  name="half-rating"
                  value={userRating}
                  precision={0.5}
                  onChange={(event, newValue) => setUserRating(newValue)}
                />
                <button
                  onClick={handleCommentarySubmit}
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enviar comentario
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layaout>
  );
}
