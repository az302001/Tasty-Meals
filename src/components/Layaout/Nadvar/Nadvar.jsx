// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { Bars3Icon } from "@heroicons/react/20/solid";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import Logo from '../../../assets/logo-tasty.png';

// import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';

// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { signOut, useSession } from 'next-auth/react';
// import SearchBar from '@/components/SearchBar/SearchBar';


// const Navbar = () => {

//   const router = useRouter();
//   const { data: session } = useSession();

//   const [estadoMenu, setEstadoMenu] = useState(false);
//   const [estadoSearch, setEstadoSearch] = useState(false);

//   const cambiarEstadoSearch = () => {
//     setEstadoSearch(!estadoSearch);
//     if (estadoMenu) setEstadoMenu(!estadoMenu);
//   };
//   const cambiarEstadoMenu = () => {
//     setEstadoMenu(!estadoMenu);
//     if (estadoSearch) setEstadoSearch(!estadoSearch);
//   };

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.replace('/home');
//   };

//   const handleSignInState = () => {
//     const currentPage = router.pathname;
//     sessionStorage.setItem('currentPage', currentPage)
//   }

//   const rutas = {
//     "/home": "Inicio",
//     "/menu": "Menú",
//     "/dashboard/create": "Crear",
//     "/ordenes": "Mis ordenes",
//   };

//   return (
//     <div>
//       <div className='flex flex-row bg-color3 justify-between pl-3 pr-5 border-b-2 border-color1'>
//         <Link href="/home">
//           <div className='w-28 h-28 cursor-pointer'>
//             <Image src={Logo} />
//           </div>
//         </Link>

      


//         <div className='ml-20 mt-[32px]'>
//           <ShoppingCart />
//         </div>
//         <div className='flex flex-col justify-center gap-10 font text-1xl'>
//           {/* <button onClick={cambiarEstadoBoton}>
//             {!estadoBoton ? (
//               <Bars3Icon className="h-14 w-14 text-color1" />
//             ) :
//               <XMarkIcon className="h-14 w-14 text-color2" />
//             }
//           </button> */}


//         </div>
//       </div>
//       {
//         estadoMenu && (
//           <div className='flex flex-col bg-color1 pl-5 pt-6 pb-8 text-2xl text-color3 font-manrope absolute z-10 left-0 right-0'>
//             {session && (
//               <>
//                 <div className='flex flex-row items-center mb-4 gap-2 text-white'>
//                   <img src={session.user.image} alt='user-image' className='w-16 h-16 rounded-full bg-gray-500' />
//                   {session.user.name}
//                 </div>
//               </>
//             )}

//             {Object.entries(rutas).map(([rut, nombre]) => (
//               <Link href={rut} key={rut}>
//                 <button className="border-b pb-1 w-40 text-left hover:text-white">{nombre}</button>
//               </Link>
//             ))}

//             {session ? (
//               <button type='button' className="border-b pb-1 text-color2 w-40 text-left" onClick={handleSignOut}>Cerrar sesión</button>
//             ) : <>
//               <Link href="/login">
//                 <button type='button' className="border-b pb-1 text-color2 w-40 text-left" onClick={handleSignInState}>Iniciar sesión</button>
//               </Link>
//             </>}

//           </div>
//         )
//       }
//       {
//         estadoSearch && (
//           <div className='bg-color3 border-b-2 border-color1'>
//             <SearchBar />
//           </div>
//         )
//       }
//     </div >
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Logo from '../../../assets/logo-tasty.png';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from 'next-auth/react';
import SearchBar from '@/components/SearchBar/SearchBar';

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';


const Navbar = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [estadoMenu, setEstadoMenu] = useState(false);
  const [estadoSearch, setEstadoSearch] = useState(false);

  const cambiarEstadoSearch = () => {
    setEstadoSearch(!estadoSearch);
    if (estadoMenu) setEstadoMenu(!estadoMenu);
  };
  const cambiarEstadoMenu = () => {
    setEstadoMenu(!estadoMenu);
    if (estadoSearch) setEstadoSearch(!estadoSearch);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.replace('/home');
  };

  const handleSignInState = () => {
    const currentPage = router.pathname;
    sessionStorage.setItem('currentPage', currentPage)
  }

  const rutas = {
    "/home": "Home",
    "/menu": "Menú",
    "/dashboard/create": "Crear",
    "/ordenes": "Mis ordenes",
  };


  return (
    <div>
      <div className='flex flex-row w-full bg-color3 justify-between pl-3 pr-5 border-b-2 border-color1'>
        <Link href="/home">
          <div className='w-28 h-28' >
            <Image src={Logo} />
          </div>
        </Link>
        <div className='flex flex-row justify-center items-center gap-3'>
            
        <ShoppingCart className="h-8 w-8 text-color1 " />
            
          <button onClick={cambiarEstadoSearch}>
            {!estadoSearch ? (
              <MagnifyingGlassIcon className="h-8 w-8 text-color1" />
            ) :
              <XMarkIcon className="h-8 w-8 text-color2" />
            }
          </button>
          <div className='flex flex-col justify-center gap-10 font text-1xl'>
            <button onClick={cambiarEstadoMenu}>
              {!estadoMenu ? (
                <Bars3Icon className="h-10 w-10 text-color1" />
              ) :
                <XMarkIcon className="h-10 w-10 text-color2" />
              }
            </button>
          </div>
        </div>
      </div>
      {
        estadoMenu && (
          <div className='flex flex-col bg-color1 pl-5 pt-6 pb-8 text-2xl text-color3 font-manrope absolute z-10 left-0 right-0'>
            {session && (
              <>
                <div className='flex flex-row items-center mb-4 gap-2 text-white'>
                  <img src={session.user.image} alt='user-image' className='w-16 h-16 rounded-full bg-gray-500' />
                  {session.user.name}
                </div>
              </>
            )}

            {Object.entries(rutas).map(([rut, nombre]) => (
              <Link href={rut} key={rut}>
                <button className="border-b pb-1 w-40 text-left hover:text-white">{nombre}</button>
              </Link>
            ))}

            {session ? (
              <button type='button' className="border-b pb-1 text-color2 w-40 text-left" onClick={handleSignOut}>Cerrar sesión</button>
            ) : <>
              <Link href="/login">
                <button type='button' className="border-b pb-1 text-color2 w-40 text-left" onClick={handleSignInState}>Iniciar sesión</button>
              </Link>
            </>}

          </div>
        )
      }
      {
        estadoSearch && (
          <div className='bg-color3 border-b-2 border-color1'>
            <SearchBar />
          </div>
        )
      }
    </div >
  );
};

export default Navbar;

