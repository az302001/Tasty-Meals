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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    localStorage.setItem("transactionID", 0)
    dispatch(createTransaction(foodsIds, costo, userId, approved)).then(() => {
      // setCartItem([])
      setIsModalOpen(true); // Open the modal when button is clicked
      // url?router.push(url):'cargando...'
    });
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div>
      <button
        onClick={handleBttnClick}
        className="mt-4  mb-2 px-4 py-2 w-40 h-12 bg-color1 text-color3 font-bold rounded-lg hover:bg-color2 hover:text-white transition duration-300"
      >
        Pagar
      </button>
      {isModalOpen && (
        <div className="modal fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <span  className="close absolute top-2 right-2 text-gray-400 cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <a href={url} target="_blank" rel="noopener noreferrer"  className="text-xl font-bold text-blue-600">
              Mercado Pago
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
