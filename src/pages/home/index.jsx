import React from 'react';
import Layaout from '@/components/Layaout/Layaout';
import Link from 'next/link';
import Destacados from '@/components/Destacados/Destacados';


const index = () => {

  return (
    
    <Layaout>
      <div style={{ "marginTop": "2rem" }}>
        <Destacados />
      </div>
      <Link href='/menu'>
        <button style={{ "marginTop": "3em", "marginLeft": "3em", "color":"#F5E9CF", "backgroundColor":"#4D455D", "width": "210px","height": "74px", "fontSize": "30px" }}>Ver menú</button>
      </Link>
    </Layaout>

  );
};

export default index;