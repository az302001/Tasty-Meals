import React, { useEffect } from 'react';
import { getDiscounts, getFoods } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card/Card';
import Layaout from '@/components/Layaout/Layaout';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Discounts = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foodFilter);
  const discounts = useSelector((state) => state.products.discounts);

  const router = useRouter();

  useEffect(() => {
    dispatch(getFoods());
    dispatch(getDiscounts());
  }, [])

  return (
    <Layaout>
      <div className="m-3">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-8 w-8 text-color1" />
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-0  md:gap-y-0.5 md:gap-x-4 '>
        {foods.map((food) =>
          food.discount > 0 ?
            <div className='flex mb-5  '>
              <Card food={food} />
            </div> :
            <h1></h1>
        )}
      </div>
    </Layaout>
  )
};

export default Discounts;
