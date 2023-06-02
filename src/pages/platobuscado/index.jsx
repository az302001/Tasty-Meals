import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '@/components/Cards/Cards';
import { getFoodByName } from '@/redux/actions';
import { useRouter } from 'next/router';
import Link from "next/link";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";

import Layaout from '@/components/Layaout/Layaout';

const index = () => {

  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();
  const foodByName = useSelector((state) => state.foodByName);

  useEffect(() => {
    if (name) {
      dispatch(getFoodByName(name));
    }

    return () => {
      dispatch({ type: 'GET_FOOD_BY_NAME', payload: [] });
    };
  }, [dispatch, name]);


  return (
    <Layaout>
      <div>
        <div className='m-3'>
          <Link href="/menu">
            <ArrowLeftIcon className="h-8 w-8 text-color1" />
          </Link>
        </div>
        <h1 style={{ "marginBottom": "1rem", "textAlign": "center", "fontSize": "2rem" }}>Plato por nombre</h1>
        {foodByName.length > 0 ? (
          <Cards foods={foodByName} />
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </Layaout>
  )
}
export default index;