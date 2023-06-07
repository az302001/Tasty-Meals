import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";


const SearchBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [valorInput, setValorInput] = useState('');


  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/platobuscado?name=${valorInput}`);
    setValorInput('')
  };

  function handleInputChange(event) {
    setValorInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center flex-row items-center'>
      <div className='flex m-2'>
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          value={valorInput}
          onChange={handleInputChange}
          className="border-2 border-color1 inline-block rounded-md p-0.5 pl-2" />
          <button type="submit">
            <MagnifyingGlassIcon className="h-8 w-8 text-color1" />
          </button>
      </div>
    </form>
  );
};

export default SearchBar;


{/* <h2 className='font-manrope text-color1'>Buscar plato</h2>
        <div className="border-2 border-color1 inline-block rounded-md p-0.5">
          <input
            className="input"
            placeholder="Buscar..."
            autocomplete="off"
          />
        </div>
        <div></div> */}