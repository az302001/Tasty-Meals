import React from 'react';
import { StarIcon } from "@heroicons/react/24/solid";

const Rating = () => {
  return (
    <div className='flex flex-row'>
        {
            [...Array(5)].map(() => {
                return(
                  <label className='mx-auto'>
                      <StarIcon  className="h-6 w-6 text-yellow-500" />
                  </label>   
                )      
            })
        }
    </div>
  );
};

export default Rating;