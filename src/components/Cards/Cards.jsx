import React from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css';



const Cards = ({ foods }) => {
  console.log(foods);
  return (
    <div className={style.cardsContainer}>
      { foods?.map((food, i) =>
      <div className={style.Card}>
        <Card key={i} food={food}/>

      </div>
      )}
    </div>
  );
};

export default Cards;