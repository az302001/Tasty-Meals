import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cards from '@/components/Cards/Cards';
import { getFoods } from '@/redux/actions';

import SearchBar from '@/components/SearchBar/SearchBar';
import Layaout from '@/components/Layaout/Layaout';

const Menu = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);

    useEffect(() => {
        dispatch(getFoods());
    }, [dispatch]);
    return (
        <div>
            <Layaout>
                <div>
                    <SearchBar />
                </div>
                <div style={{ "marginTop": "2rem" }}>
                    <Cards foods={foods} />
                </div>
            </Layaout>
        </div>
    );
};

export default Menu;