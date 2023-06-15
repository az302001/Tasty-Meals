import React, { useEffect } from 'react';
import { getDiscounts, getFoods } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card/Card';
import Layaout from '@/components/Layaout/Layaout';

const Discounts = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.products.foodFilter);
    const discounts = useSelector((state) => state.products.discounts);



    useEffect(() => {
        dispatch(getFoods());
        dispatch(getDiscounts());
    }, [])

  return (
    <Layaout>
       <div className='flex flex-wrap'>
          {foods.map((food) =>
             food.discount > 0 ?
             <div className='w-[25vw] p-2 bg-color3 m-5 rounded mx-auto'>
                 <Card food={food} /> 
             </div>: 
                <h1></h1> 
           )}
      </div>
    </Layaout>
  )
};

export default Discounts;
