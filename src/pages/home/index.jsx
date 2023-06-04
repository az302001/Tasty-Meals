import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '@/redux/actions';
import Cards from '@/components/Cards/Cards';

import Layaout from '@/components/Layaout/Layaout';

const index = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.products.foods);


  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  console.log(foods);


  return (

   
<Layaout>
      <div style={{ "marginTop": "2rem" }}>

        {/* <h1 style={{ "marginBottom": "1rem", "textAlign": "center", "fontSize": "2rem" }}>Home</h1>
       <Cards foods={foods} />

       <div>
       <SearchBar/>
      </div> */}


        {/* foods.slice(0,5).map((foods) => 
           <Cards foods={foods} />
         ) */}

        <Cards foods={foods.slice(0,5)} />
        <button>Menu</button>

      </div>
    </Layaout>

    //     <Layaout>
    //       <div style={{ "marginTop": "2rem" }}>
    //         <h1 style={{ "marginBottom": "1rem", "textAlign": "center", "fontSize": "2rem" }}>Home</h1>
    //         <Cards foods={foods} />
    //       </div>
    //     </Layaout>

  )

}

export default index