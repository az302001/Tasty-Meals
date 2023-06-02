import React from 'react';
import Card from '../Card/Card';

import styles from"./cards.module.css";

const Cards = ({ foods }) => {
  return (
    <div className={styles.card_list}>
      { foods?.map((food, i) =>
          <Card key={i} food={food} />
      )}
    </div>
  );
};

export default Cards;