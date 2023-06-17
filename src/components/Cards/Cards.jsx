import React from 'react';
import Card from '../Card/Card';
import style from './cards.module.css';



const Cards = ({ foods }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
      { foods?.map((food, i) =>
      <div className='flex mb-5 mt-3' key={food.id}>
        <Card key={i} food={food}/>
      </div>
      )}
    </div>
  );
};

export default Cards;