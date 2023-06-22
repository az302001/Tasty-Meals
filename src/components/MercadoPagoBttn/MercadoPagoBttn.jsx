// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useSession } from "next-auth/react";
// import { createTransaction } from "@/redux/actions";

// export default function MercadoPagoBttn({ product, carro }) {
//   const [url, setUrl] = useState(null);
//   const router = useRouter();

//   const dispatch = useDispatch();
//   // const [cartItem, setCartItem] = useRecoilState(cartState);
//   const userData = useSelector((state) => state.products.userData);
//   const { data: session } = useSession();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const calculateTotalPrice = () => {
//     let newTotal = 0;
//     carro.forEach(
//       (item) => (newTotal += Math.ceil(item.price) * item.quantity)
//     );
//     return newTotal;
//   };



//   useEffect(() => {
//     const generateLink = async () => {
//       try {
//         const { data: preference } = await axios.post(
//           "/api/MercadoPago/checkout",
//           {
//             product,
//           }
//         );
//         setUrl(preference.url);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     generateLink();
//   }, []);

//   const handleBttnClick = (e) => {
//     e.preventDefault();

//     const foodsIds = carro.map((item) => item.id);
//     const costo = calculateTotalPrice();
//     const userId = session?.user?.id || userData?.data?.id;
//     const approved = false;

//     localStorage.setItem("transactionID", 0)
//     dispatch(createTransaction(foodsIds, costo, userId, approved)).then(() => {
//       // setCartItem([])
//       setIsModalOpen(true); // Open the modal when button is clicked
//       // url?router.push(url):'cargando...'
//     });

//     //     router.push(url);

//   };
//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };
//   return (
//     <div>
//       <button
//         onClick={handleBttnClick}
//         className="mt-4  mb-2 px-4 py-2 w-40 h-12 bg-color1 text-color3 font-bold rounded-lg hover:bg-color2 hover:text-white transition duration-300"
//       >
//         Pagar
//       </button>
//       {isModalOpen && (
//         <div className="modal fixed top-0 left-0 w-screen h-screen flex items-center justify-center ">
//           <div className="modal-content bg-color1 p-6 rounded-lg shadow-lg w-[40%] h-[20%] ">
//             <span className="close absolute top-2 right-2 text-gray-400 cursor-pointer" onClick={closeModal}>
//               &times;
//             </span>
//             <span className=" flex  flex-col items-center ">
//               <h2 className="font-bold text-xl text-white">¿Esta seguro de realizar la compra?</h2>
//               <div className="flex justify-center pt-5">

//                 <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-600">
//                   Confirmar
//                 </a>
//                 <a onClick={closeModal} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-red-600  cursor-pointer  ml-5 ">
//                   Rechazar
//                 </a>
//               </div>
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { createTransaction } from "@/redux/actions";
import { Modal, Typography, Box, Button } from "@mui/material";

export default function MercadoPagoBttn({ product, carro }) {
  const [url, setUrl] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();
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
      setIsModalOpen(true); // Open the modal when button is clicked
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <button
        onClick={handleBttnClick}
        className="mt-4 mb-2 px-4 py-2 w-40 h-12 bg-color1 text-color3 font-bold rounded-lg hover:bg-color2 hover:text-white transition duration-300"
      >
        Pagar
      </button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#F5E9CF",
            boxShadow: 24,
            p: 4,
            borderRadius: '0.5em'
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            ¿Está seguro de realizar la compra?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
            <Button variant="contained" onClick={closeModal} color="error">
              Rechazar
            </Button>
            <Button
              variant="contained"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ ml: 2 }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

