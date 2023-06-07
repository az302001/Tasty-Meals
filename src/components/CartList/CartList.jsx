import React from 'react';

const CartList = ({ data }) => {
    const { name, image, quantity, price } = data;

  return (
    <div>
        <div className='bg-[#fff] max-w-[800px] mx-auto mt-4 py2 px6 flex gap-6 items center justify-between'>
            <img src={image} alt="" className='h-[100px]'/>
            <div>
                <div className='font-bold text-2xl'>{name}</div>
                <div>Cantidad: {quantity}</div>
            </div>
            <div className='text-3xl font-bold'>${price * quantity}</div>
        </div>
    </div>
  );
};

export default CartList;