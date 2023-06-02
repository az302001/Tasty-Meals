import React from 'react';
import Link from 'next/link';

import styles from"./card.module.css";

const Card = ({ food }) => {
    const { id, name, image, price, description } = food;

    return (
        <div className={styles.card_container}>
            <Link href={`detail/${id}`}>
                <h1>{name}</h1> 
            </Link>
            <img src={image} alt={name} />
            
            <p>{price}</p>
            <p>{description}</p>
        </div>
    )
};


export default Card;
