import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from 'recoil';
import { cartState } from '../../../atoms/cartState';

const ShoppingCart = () => {

    const [ cartItem ] = useRecoilState(cartState);


  return (
    <div className='relative cursor-pointer'>
        <Link href='/cart'>
            <div className='w-[42px]'>
                <ShoppingCartIcon className='text-color1 focus:text-color2 hover:text-color2'/>
                
                <span className='absolute -top-2 -rigth-2 text-[13px] bg-color2 h-[23px] w-[18px] rounded-full grid place-items-center text-white'>{cartItem.length}</span>
            </div>
        </Link>
    </div>
  );
};

export default ShoppingCart;