import React from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css';



const Cards = ({ foods }) => {

  return (
    <div>
      { foods?.map((food, i) =>
      <div className='flex mb-5 mt-3'>
        <Card key={i} food={food}/>
      </div>
      )}
    </div>
  );
};

export default Cards;