import React from 'react';
import Link from 'next/link';
import style from './Card.module.css';
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = ({ food }) => {

    const { id, name, image, price, description } = food;


    const [ cartItem, setCartItem ] = useRecoilState(cartState);

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
        if(cartItem.findIndex((fo) => fo.id === food.id) === -1) {
            setCartItem((prevState) => [...prevState, food]);
        } else {
            setCartItem((prevState) => {
                return prevState.map((item) => {
                    return item.id === food.id ? {...item, quantity: item.quantity + 1} : item
                })
            });
        }
        handleClick();
    };

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
            <div onClick={addItemToCart} className='cursor-pointer'>

            <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68 text-color2"/>
            </div>
        </div>
    )
};


export default Card;
