import React from 'react';
import { MinusCircleIcon } from "@heroicons/react/24/outline";

const CartList = ({ food, handleQuantityChange, removeItem }) => {
  const { id, name, image, price, quantity } = food;

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    handleQuantityChange(id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      handleQuantityChange(id, newQuantity);
    }
  };

  return (
    <div>
      <div className='bg-color3 max-w-[400px] mx-auto mt-4 py-2 px-6 flex gap-6 items-end justify-between rounded relative'>
        <div className='mx-auto mr-10'>
          <div className='font-bold text-2xl text-color1 font-pacifico text-center'>
            {name}
          </div>
          <div onClick={handleRemoveItem} className='absolute top-0 right-0 cursor-pointer'>
            <MinusCircleIcon className='h-10 w-10 text-color2 mr-2 mt-1' />
          </div>
          <img src={image} alt='' className='h-[100px] rounded text-center' />
          <div className='text-center font-josefin text-color2 font-bold'>
            Cantidad:
            <div className='flex items-center justify-center'>
              <button
                onClick={handleDecrement}
                className='px-2 py-1 rounded-l-md border text-color2 border-color2 focus:outline-none mr-2'
                disabled={quantity < 1}
              >
                -
              </button>
              <input
                type='number'
                value={quantity}
                onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
                className='w-12 h-8 px-2 py-1 text-center rounded-md border border-color2 focus:outline-none'
              />
              <button
                onClick={handleIncrement}
                className='px-2 py-1 rounded-r-md border text-color2 border-color2 focus:outline-none ml-2'
                disabled={quantity >= 5}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className='text-2xl font-bold font-manrope mr-2'>${Math.ceil(price * quantity)}</div>
      </div>
    </div>
  );
};

export default CartList;