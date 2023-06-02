import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';


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
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Buscar" value={valorInput} onChange={handleInputChange} />
        
        <button type="submit">Buscar</button>
      </form>
    );
  };
  
export default SearchBar;