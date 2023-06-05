import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import style from './card.module.css';
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Carrito from "@/assets/carro-de-la-carretilla.png";

const Card = ({ food }) => {
    const { id, name, image, price, description } = food;

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

                <div className='flex flex-col items-end justify-between'>
                    <div name="carrito-compras" className="w-9 h-9">
                        <Image src={Carrito} alt={"carrito"}></Image>
                    </div>

                    {/* <PlusCircleIcon className="h-10 w-10 text-color1" /> */}
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













// import React from 'react';
// import Link from 'next/link';
// import style from './Card.module.css';
// import { PlusCircleIcon } from "@heroicons/react/24/solid";


// const Card = ({ food }) => {

//     const { id, name, image, price, description } = food;

//     return (

//         //         <div className={styles.card_container}>
//         //             <Link href={`/detail?id=${id}`}>
//         //                 <h1>{name}</h1>

//         // <div className="flex flex-row ml-3 bg-color3 h-20 w-360 rounded">
//         <div className="flex flex-row h-20">
//             <figure className="w-32 h-32">

//                 <img src={image} alt={name} className="w-full h-full object-cover" />

//             </figure>

//             <div className={style.info}>
//                 <Link href={`/detail?id=${id}`}>
//                     <h1 className="text-52525C left-45.23 right-18.26 top-9 bottom-68 font-pacifico font-normal font-18 leading-150">{name}</h1>

//                 </Link>

//                 <p className="left-45.5 right-11.99 top-35 bottom-18 text-color2 font-josefin font-normal text-sm leading-150">{description}</p>

//             </div>

//             <p className="left-80 mt-12 font-pacifico font-normal text-20 leading-150">${price}</p>
//             <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68" />
//         </div>
//     )
// };


// export default Card;
