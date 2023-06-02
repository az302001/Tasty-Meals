import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '@/redux/actions';
import Cards from '@/components/Cards/Cards';

const index = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <div style={{ "marginTop": "2rem" }}>
      {
        foods.slice(0,5).map((food) => {
          <Cards />
        })
      }
      <button>Menu</button>
    </div>
  )
}

export default index