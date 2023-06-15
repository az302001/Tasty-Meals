import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import Discounts from '../../assets/Discounts.png';
import Image from 'next/image';

const Card = ({ food, discount }) => {
  const { id, name, image, price, description } = food;
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

  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const router = useRouter();

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
        text: 'Tienes que registrarte para comprar!',
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
// localstorege.setitem(newitem)
  // const addItemToCart = () => {
  //   const newItem = { ...food, quantity };

  //   if (!session || !userData.data) {
  //     alert('Debes iniciar sesión para poder comprar.');
  //     return;
  //   }

  //   if (cartItem.findIndex((fo) => fo.id === food.id) === -1) {
  //     setCartItem((prevState) => [...prevState, newItem]);
  //   } else {
  //     setCartItem((prevState) => {
  //       return prevState.map((item) => {
  //         return item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item;
  //       });
  //     });
  //   }

  //   handleClick();
  // };

  const totalPrice = food.discount ? parseInt(price - food.discount * price / 100 * quantity ) : price * quantity;

  return (
    <div className="bg-color3 flex flex-col w-full items-center rounded-3xl">
      <div>
        <Link href={`/detail?id=${id}`}>
          <h1 className="font-pacifico text-3xl text-color1 p-1 cursor-pointer">{name}</h1>
        </Link>
      </div>

      <div className='flex flex-row w-full rounded-3x1 px-4 justify-around'>
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
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-12 h-8 px-2 py-1 text-center rounded-md border border-color2 focus:outline-none font-manrope text-color2 font-bold"
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
            <div className='flex flfex-row'>
              <h2 className="text-pacifico text-2xl text-color1 mr-5 ml-2">Antes: ${parseInt(food.price)}</h2>
              <h2 className="text-pacifico text-2xl text-color1">Ahora: ${parseInt(totalPrice)}</h2>
              <div className="h-[5vh] w-[5vw] mb-10"><Image src={Discounts} /></div>
            </div>
            :  <div className="text-pacifico text-2xl text-color1">${parseInt(totalPrice)}</div>
          }
          {/* <div className="text-pacifico text-2xl text-color1">${parseInt(totalPrice)}</div> */}
        </div>
      </div>

      <div>
        <p className="px-4 py-2 text-color2 font-josefin text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;      