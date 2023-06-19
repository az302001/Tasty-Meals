import React, { useEffect, useState } from 'react';
import { getDiscounts, getFoods } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card/Card';
import Layaout from '@/components/Layaout/Layaout';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

const Discounts = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foodFilter);
  const [isReady, setIsReady] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);

  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
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
        setShowMessage(true); 
        setTimeout(() => {
          router.replace("/menu"); 
        }, 2000);
      } else {
        setIsReady(true);
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    dispatch(getFoods());
    dispatch(getDiscounts());
  }, [])

  if (!isReady) {
    return(
      <Layaout>
       <div className="text-center mt-[20%]">
          <p className="text-3xl text-color1 font-bold">Por favor inicia sesión para poder ver nuestras promos</p>
       </div>
      </Layaout>
      
    );
  }

  const discountedFoods = foods.filter((food) => food.discount > 0);

  if (discountedFoods.length === 0) {
    return (
      <Layaout>
        <div className="text-center mt-[20%]">
          <p className="text-3xl text-color1 font-bold">
            No hay descuentos disponibles en este momento
          </p>
        </div>
      </Layaout>
    );
  }

  return (
    <Layaout>
      <div className="m-3">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-8 w-8 text-color1" />
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-0  md:gap-y-0.5 md:gap-x-4 '>
        {discountedFoods.map((food) => (
            <div className='flex mb-5  '>
              <Card food={food} />
            </div>
        ))}
      </div>
    </Layaout>
  )
};

export default Discounts;
