// import React from 'react';
// import Link from 'next/link';


// import { PlusCircleIcon } from "@heroicons/react/24/outline";
// import { useRecoilState } from 'recoil';
// import { cartState } from '../../../atoms/cartState';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from "next/image";
// import Carrito from "@/assets/carro-de-la-carretilla.png";



// const Card = ({ food }) => {
//     const { id, name, image, price, description } = food;


//     const [cartItem, setCartItem] = useRecoilState(cartState);

//     const handleClick = () => {
//         toast.success('Añadido al carrito!', {
//             position: "bottom-center",
//             autoClose: 1200,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     };

//     const addItemToCart = () => {
//         if (cartItem.findIndex((fo) => fo.id === food.id) === -1) {
//             setCartItem((prevState) => [...prevState, food]);
//         } else {
//             setCartItem((prevState) => {
//                 return prevState.map((item) => {
//                     return item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
//                 })
//             });
//         }
//         handleClick();
//     };

//     return (
//         <div className="bg-color3 flex flex-col w-full items-center rounded-3xl">
//             <div>
//                 <Link href={`/detail?id=${id}`}>
//                     <h1 className="font-pacifico text-3xl text-color1 p-1">{name}</h1>
//                 </Link>
//             </div>

//             <div className='flex flex-row w-full rounded-3x1 px-4 justify-around'>

//                 <div className="w-60 h-32">
//                     <img src={image} alt={name} className="w-full h-full object-cover rounded-3xl" />
//                 </div>



//                 <div className='flex flex-col items-end justify-between'>
//                     <div name="carrito-compras" className="w-9 h-9">
//                         <Image src={Carrito} alt={"carrito"}></Image>
//                     </div>


//                 </div>

//                 <p className="left-45.5 right-11.99 top-35 bottom-18 text-color2 font-josefin font-normal text-sm leading-150">{description}</p>

//             </div>

//             <p className="left-80 mt-12 font-pacifico font-normal text-20 leading-150">${price}</p>
//             <div onClick={addItemToCart} className='cursor-pointer'>

//                 <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68 text-color2" />
//             </div>

//         </div>
//     );
// };

// export default Card;


import React from 'react';
import Link from 'next/link';


import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Carrito from "@/assets/carro-de-la-carretilla.png";

const Card = ({ food }) => {
    const { id, name, image, price, description } = food;


    const [cartItem, setCartItem] = useRecoilState(cartState);

    const handleClick = () => {
        toast.success('Añadido al carrito!', {
            position: "bottom-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const addItemToCart = () => {
        if (cartItem.findIndex((fo) => fo.id === food.id) === -1) {
            setCartItem((prevState) => [...prevState, food]);
        } else {
            setCartItem((prevState) => {
                return prevState.map((item) => {
                    return item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
                })
            });
        }
        handleClick();
    };

    return (
        <div className="bg-color3 flex flex-col w-full items-center rounded-3xl">
            <div>
                <Link href={`/detail?id=${id}`}>
                    <h1 className="font-pacifico text-3xl text-color1 p-1">{name}</h1>
                </Link>
            </div>

            <div className='flex flex-row w-full rounded-3x1 px-4 justify-around'>

                <div className="w-60 h-32">
                    <img src={image} alt={name} className="w-full h-full object-cover rounded-3xl" />
                </div>

                <div className='flex flex-col items-center justify-around'>
                    <div onClick={addItemToCart} className='cursor-pointer'>

                        <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68 text-color2" />
                    </div>
                    <p className="text-pacifico text-2xl text-color1">${price}</p>
                </div>
            </div>

            <div>
                <p className="px-4 py-2 text-color2 font-josefin text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;