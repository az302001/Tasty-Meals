import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '@/redux/actions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from './Rating';
import { StarIcon } from "@heroicons/react/24/solid";

const Destacados = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
  
  
  
    useEffect(() => {
      dispatch(getFoods());
    }, [dispatch]);
  
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 390,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // infinite: true,
            // dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        }
      ]
    };



  return (
    <div>
    <h1 className='text-gray text-center text-xl mt-3'>Nuestros platos destacados de hoy</h1>
      <Slider {...settings} className="h-249">
        {foods.slice(0,5).map((foods, index) => 
        <div key={index} className='mt-5 bg-color3 h-100 w-289 rounded '> 
            <img src={foods.image} className='w-193 h-193 left-50 top-213 rounded'/>
            <h1 className="text-52525C left-45.23 right-18.26 top-9 bottom-68 font-pacifico font-normal font-18 leading-150 text-center">{foods.name}</h1>
            <p className="left-45.5 right-11.99 top-35 bottom-18 text-color2 font-josefin font-normal text-sm leading-150 text-center">{foods.description}</p>
            <Rating />
           </div>
         )} </Slider>

      </div>
  );
};

export default Destacados;