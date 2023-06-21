import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { createTransaction } from "@/redux/actions";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../../../atoms/cartState";

export default function MercadoPagoBttn({ product, carro }) {
  const [url, setUrl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const userData = useSelector((state) => state.products.userData);
  const { data: session } = useSession();

  const calculateTotalPrice = () => {
    let newTotal = 0;
    carro.forEach(
      (item) => (newTotal += Math.ceil(item.price) * item.quantity)
    );
    return newTotal;
  };
  useEffect(() => {
    const generateLink = async () => {
      try {
        const { data: preference } = await axios.post(
          "/api/MercadoPago/checkout",
          {
            product,
          }
        );
        setUrl(preference.url);
      } catch (error) {
        console.log(error);
      }
    };
    generateLink();
  }, []);

  const handleBttnClick = (e) => {
    e.preventDefault();
    const foodsIds = carro.map((item) => item.id);
    const costo = calculateTotalPrice();
    const userId = session?.user?.id || userData?.data?.id;
    const approved = false;
    console.log( "dispatch en mercado button",  foodsIds, costo, userId, approved)
    dispatch(createTransaction(foodsIds, costo, userId, approved));
    setCartItem([]);
    // router.push(url);
    // router.push("/pagoexistoso?status=approved");
  };
  return (
    <div>
      <button
        onClick={handleBttnClick}
        className="mt-4  mb-2 px-4 py-2 w-40 h-12 bg-color1 text-color3 font-bold rounded-lg hover:bg-color2 hover:text-white transition duration-300"
      >
        Pagar
      </button>
    </div>
  );
}
