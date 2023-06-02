import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '@/components/Cards/Cards';
import { getFoodByName } from '@/redux/actions';
import { useRouter } from 'next/router';

const index = () => {

    const router = useRouter();
    const {name} = router.query;
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
    <div style={{ "marginTop": "2rem" }}>
      <h1 style={{ "marginBottom": "1rem", "textAlign": "center", "fontSize": "2rem" }}>Plato por nombre</h1>

      {foodByName.length > 0 ? (
        <Cards foods={foodByName} />
      ) : (
        <p>No se encontraron resultados.</p>
      )}

    </div>
  )
}
export default index;