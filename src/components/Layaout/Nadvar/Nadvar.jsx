import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import Logo from '../../../assets/logo-tasty.png';
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {

  const [estadoBoton, setEstadoBoton] = useState(false);

  const cambiarEstadoBoton = () => {
    setEstadoBoton(!estadoBoton)
  }

  return (
    <div>
      <div className='flex flex-row bg-color3 justify-between pl-3 pr-5 border-b-2 border-color1'>
        <Link href="/home">
          <div className='w-28 h-28' >
            <Image src={Logo} />
          </div>
        </Link>
        <div className='flex flex-col justify-center gap-10 font text-1xl'>
          <button onClick={cambiarEstadoBoton}>
            {!estadoBoton ? (
              <Bars3Icon className="h-14 w-14 text-color1" />
            ) :
              <XMarkIcon className="h-14 w-14 text-color2" />
            }
          </button>
        </div>
      </div>
      {estadoBoton && (
        <div className='flex flex-col bg-color1 pl-5 pt-6 pb-8 text-2xl text-color3 font-manrope absolute z-10 left-0 right-0'>
          <Link href="/home">
            <button className="border-b pb-1 w-40 text-left">Home</button>
          </Link>
          <Link href="/menu">
            <button className="border-b pb-1 w-40 text-left">Menú</button>
          </Link>
          <Link href="/ordenes">
            <button className="border-b pb-1 w-40 text-left">Mis ordenes</button>
          </Link>
          <Link href="/dashboard/create">
            <button className="border-b pb-1 w-40 text-left">Create</button>
          </Link>
          <Link href="/login">
            <button className="border-b pb-1 text-color2 w-40 text-left">Salir</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;


