import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';
import { toast } from 'react-toastify';
import { Rating, Stack } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import Discounts from '../../assets/Discounts.png';
import Image from 'next/image';

const Card = ({ food, discount }) => {
  const { id, name, image, price, description,rating } = food;
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useRecoilState(cartState);

  const handleClick = () => {
    Swal.fire({
      position: 'bottom-center',
      icon: 'success',
      title: `${name} añadido al carrito`,
      showConfirmButton: false,
      timer: 1500
    })
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };


  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const precio = Math.round(food.price)
  // console.log (precio);


  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);


  const addItemToCart = () => {
    const newItem = { ...food, quantity };
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Registrate para poder comprar!',
        footer: '<a href="/login" style="text-decoration: underline; color: blue;">Ir al registro</a>'
      })

    }
    if (cartItem.findIndex((fo) => fo.id === food.id) === -1) {
      setCartItem((prevState) => [...prevState, newItem]);
    } else {
      setCartItem((prevState) => {
        return prevState.map((item) => {
          return item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item;
        });
      });
    }
    handleClick();
  };

  const totalPrice = food.discount ? parseInt(precio - food.discount * precio / 100) * quantity : precio * quantity;

  // console.log(totalPrice);

  return (
    <div className=" w-[100%] h-[100%] bg-gradient-to-r bg-color3   shadow-lg rounded-lg text-white p-4 transition duration-300 hover:-translate-y-2 ">
      <div>
        <Link href={`/detail?id=${id}`}>
          <h1 className="font-pacifico text-3xl text-color1 font-bold  p-1 cursor-pointer">{name}</h1>
        </Link>
      </div>

      <div className='flex flex-row w-full rounded-3x1  justify-around'>
        <div className="w-60 h-32 cursor-pointer">
          <Link href={`/detail?id=${id}`}>
            <img src={image} alt={name} className="w-full h-full object-cover rounded-3xl" />
          </Link>
        </div>
        <div className='flex flex-col items-center justify-around'>
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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= 5) {
                  setQuantity(value);
                }
              }}
              className="w-12 h-8 px-2 py-1 text-center rounded-md border border-color2 focus:outline-none font-manrope text-color2 font-bold"
              inputMode="numeric"
            />
            <button
              onClick={handleIncrement}
              className='px-2 py-1 rounded-r-md border text-color2 border-color2 focus:outline-none'
              disabled={quantity >= 5}
            >
              +
            </button>
          </div>
          <div onClick={addItemToCart} className='cursor-pointer'>
            <PlusCircleIcon className="h-10 w-10 bg-#E96479 inset-13 top-13 left-89.92 right-4.9 bottom-68 text-color2" />
          </div>
          {
            food.discount > 0 ?
              <div className='flex flex-cols text-[18px]  md:text-[20px] font-pacifico font-bold'>
                <h2 className="   text-color1  ml-2">Antes: ${parseInt(food.price)}</h2>
                <h2 className=" text-color1">Ahora: ${parseInt(totalPrice)}</h2>
                <div className="h-[5vh] w-[12vw] md:w-[10vw] lg:w-[8vw] mb-10"  ><Image src={Discounts} /></div>
              </div>
              : <div className="text-pacifico text-2xl text-color1">${parseInt(totalPrice)}</div>
          }
          {/* <div className="text-pacifico text-2xl text-color1">${parseInt(totalPrice)}</div> */}
        </div>
      </div>

      <div>
        <Stack spacing={1}>
          <div className="flex items-center pl-[13%] pt-[1%] font-bold text-color1">
            <Rating
              name="half-rating"
              value={parseInt(rating)}
              precision={0.5}
              readOnly
            />
          </div>
        </Stack>
      </div>

      <div>
        <p className="px-4 py-2 text-color1 font-semibold  font-josefin text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;      