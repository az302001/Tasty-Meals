import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFoodById } from '@/redux/actions';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const detailFoods = useSelector((state) => state.detailFoods);
    console.log(detailFoods);

    useEffect(() => {
        dispatch(getFoodById(id));
    }, [dispatch, id]);


    return (
        <div>
            <h1>Detail</h1>

            <p>{detailFoods.name}</p>
        </div>
    )
};


export default Detail;