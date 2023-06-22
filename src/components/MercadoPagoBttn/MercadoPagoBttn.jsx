import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function MercadoPagoBttn({ product }) {
  const [url, setUrl] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const userData = useSelector((state) => state.products.userData);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);


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

    localStorage.setItem("transactionID", 0)
    dispatch(createTransaction(foodsIds, costo, userId, approved)).then(() => {
      // setCartItem([])
      setIsModalOpen(true); // Open the modal when button is clicked
      // url?router.push(url):'cargando...'
    });

//     router.push(url);

  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div>
      <button
        onClick={handleBttnClick}
        className="text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800"
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
