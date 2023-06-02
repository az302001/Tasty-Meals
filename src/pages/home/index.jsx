import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '@/redux/actions';
import Cards from '@/components/Cards/Cards';
import SearchBar from '@/components/SearchBar/SearchBar';

const index = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <div style={{ "marginTop": "2rem" }}>
      <h1 style={{ "marginBottom": "1rem", "textAlign": "center", "fontSize": "2rem" }}>Home</h1>
      <Cards foods={foods} />

      <div>
      <SearchBar/>
      </div>

    </div>
  )
}

export default index