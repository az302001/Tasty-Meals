import React from 'react';
import Link from 'next/link';
import style from './Card.module.css';
import { PlusCircleIcon } from "@heroicons/react/24/solid";


const Card = ({ food }) => {

    const { id, name, image, price, description } = food;

    return (

//         <div className={styles.card_container}>
//             <Link href={`/detail?id=${id}`}>
//                 <h1>{name}</h1> 

        <div className="flex flex-row ml-3 bg-color3 h-20 w-360 rounded">
            <figure className="w-30">
            <img src={image} alt={name} className="w-full h-full rounded"/>

            </figure>
            
            <div className={style.info}>
             <Link href={`/detail?id=${id}`}>
                <h1 className="text-52525C left-45.23 right-18.26 top-9 bottom-68 font-pacifico font-normal font-18 leading-150">{name}</h1> 

            </Link>
            
            <p className="left-45.5 right-11.99 top-35 bottom-18 text-color2 font-josefin font-normal text-sm leading-150">{description}</p>

            </div>
            
            <p className="left-80 mt-12 font-pacifico font-normal text-20 leading-150">${price}</p>
            <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68" />
        </div>
    )
};


export default Card;
