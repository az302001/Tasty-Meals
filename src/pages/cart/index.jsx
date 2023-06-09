import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';
import CartList from '@/components/CartList/CartList';
import Layaout from '@/components/Layaout/Layaout';

const Cart = () => {
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const [total, setTotal] = useState(0);

  const calculateTotalPrice = () => {
    let newTotal = 0;
    cartItem.forEach((item) => (newTotal += Math.ceil(item.price) * item.quantity));
    return newTotal;
  };

  const updateTotalPrice = () => {
    const newTotal = calculateTotalPrice();
    setTotal(newTotal);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItem.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItem(updatedCartItems);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItem.filter((item) => item.id !== itemId);
    setCartItem(updatedCartItems);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [cartItem]);

  return (
    <Layaout>
      <div>
        <div className='container mx-auto'>
          {cartItem.length <= 0 ? (
            <h1 className='text-center text-4xl mt-32'>Tu carrito está vacío</h1>
          ) : (
            cartItem.map((item) => (
              <CartList
                key={item.id}
                food={item}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
              />
            ))
          )}

          {cartItem.length > 0 && (
            <div className='max-w-[800px] mx-auto mt-4'>
              <div className='flex flex-row items-center'>
                <h2 className='text-center text-2xl font-bold font-manrope'>
                  Total a pagar: ${total}
                </h2>
                <button className='text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800 rounded mb-2'>
                  Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layaout>
  );
};

export default Cart;
