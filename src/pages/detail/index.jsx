import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, cleanState, getFoodById, getFoodComments } from "@/redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Layaout from "@/components/Layaout/Layaout";
import { Rating, Stack } from "@mui/material";
import { cartState } from "../../../atoms/cartState";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { PageProtection } from "@/Hocs/sesionVerify";
import Loader from "@/components/Loader/index";

const index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userRating, setUserRating] = useState(1);
  const [userVote, setUserVote] = useState(false);
  const detailFoods = useSelector((state) => state.products.detailFoods);
  const rating = parseFloat(detailFoods.rating);
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const [isLoading, setIsLoading] = useState(true);
  const reviews = useSelector((state) => state.products.review);

  const handleClick = () => {
    Swal.fire(`${detailFoods.name} añadido al carrito!`);
  };

  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };


  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addItemToCart = () => {
    const newItem = { ...detailFoods, quantity };
    let google = session;
    let local = userData?.data?.username;
    if (google) {
      google = true;
      local = true;
    } else {
      google = false;
    }
    if (local) {
      google = true;
      local = true;
    } else {
      local = false;
    }

    if (!google || !local) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Tienes que registrarte para comprar!",
        footer:
          '<a href="/login" style="text-decoration: underline; color: blue;">Ir al registro</a>',
      });
    }
    if (cartItem.findIndex((fo) => fo.id === detailFoods.id) === -1) {
      setCartItem((prevState) => [...prevState, newItem]);
    } else {
      setCartItem((prevState) => {
        return prevState.map((item) => {
          return item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      });
    }
    handleClick();
  };

  // const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getFoodById(id));
        dispatch(getFoodComments(id));
        // Simulate loading delay for 2,5 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(cleanDetail());
      dispatch(cleanState());

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    };
  }, [dispatch]);
  return (
    <Layaout>
      {isLoading ? (
        <Loader />
      ) : (
        <>

          <div>
            <div className="m-3">
              <button onClick={() => router.back()}>
                <ArrowLeftIcon className="h-8 w-8 text-color1" />
              </button>
            </div>
          </div>
          <h2 className="flex font-pacifico justify-center font-monrope text-4xl font-semibold tracking-tight text-color1 pb-6 dark:text-black">
            {detailFoods.name}
          </h2>

          <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="w-full" src={detailFoods.image} alt={detailFoods.name} />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-color1 pt-2  dark:text-white">
                {detailFoods.description}
              </h5>
              <br />
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold text-color1 dark:text-white">
                  ${Math.ceil(detailFoods.price * quantity)}
                </span>

                {/* <span className="text-3xl font-semibold text-color1 dark:text-white">
                  ${detailFoods.price}
                </span> */}
                <div>
                  <Stack spacing={1}>
                    <div className="flex items-center">

                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Clasificación:
                      </span>
                      <Rating
                        name="half-rating"
                        value={parseInt(detailFoods.rating)}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    {detailFoods.disabled ? (
                      <h2 className="font-bold text-xl">
                        El plato no se encuentra disponible
                      </h2>
                    ) : (
                      <a
                        href="#"
                        onClick={addItemToCart}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Añadir al carrito
                      </a>
                    )}
                    <div className='flex items-center'>
                      <button
                        onClick={handleDecrement}
                        className='px-2 py-1 rounded-l-md border text-color2 border-color2 focus:outline-none'
                        disabled={quantity < 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        // onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-12 h-8 px-2 py-1 text-center rounded-md border border-color2 focus:outline-none font-manrope text-color2 font-bold"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value >= 1 && value <= 5) {
                            setQuantity(value);
                          }
                        }}
                      />
                      <button
                        onClick={handleIncrement}
                        className='px-2 py-1 rounded-r-md border text-color2 border-color2 focus:outline-none'
                        disabled={quantity >= 5}
                      >
                        +
                      </button>
                    </div>

                    <br />
                  </Stack>
                </div>
              </div>
            </div>

          </div>

          {/* Sección de comentarios */}
          <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-5 py-5 mt-5">
            <h3 className="text-lg font-semibold text-color1 dark:text-white">
              Comentarios:
            </h3>
            {reviews && reviews.length > 0 ? (
              <div className="flex flex-col items-center">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="my-3 p-3 bg-gray-200 dark:bg-gray-600 rounded-lg text-center w-full"
                  >
                    <p className="text-gray-700 dark:text-gray-300">{review.comentary}</p>
                    <Rating
                      name={`rating-${review.id}`}
                      value={review.rating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                No hay comentarios disponibles.
              </p>
            )}
          </div>
        </>
      )}
    </Layaout>
  );
};

// export default index;
export default PageProtection(index);