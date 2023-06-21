import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../../../assets/logo-tasty.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar/SearchBar";
import avatar from "@/assets/Avatar-place-holder.jpg";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [mostrarBoton, setMostrarBoton] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const userData = useSelector((state) => state.products.userData);

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
    localStorage.setItem("userToken", null);
    localStorage.setItem("cartItem", []);
    router.reload();
  };

  const handleSignInState = () => {
    const currentPage = router.pathname;
    sessionStorage.setItem("currentPage", currentPage);
  };

  const rutas = {
    "/home": "Inicio",
    "/menu": "Menú",

    // "/dashboard/create": "Crear",
    // "/mispedidos": "Mis ordenes",
    // "/dashboard": "Panel Admin",
    // "/discounts": "Promociones",
    // "/cart": "Mis ordenes",
  };

  const toggleBoton = () => {
    setMostrarBoton(!mostrarBoton);
  };

  return (
    <div>
      <div className="flex flex-row w-full bg-color3 justify-between pl-3 pr-5 border-b-2 border-color1">
        <Link href="/home">
          <div className="w-28 h-28 cursor-pointer">
            <Image src={Logo} />
          </div>
        </Link>
        <div className="flex lg:w-[50%]  sm:w-[90%]  justify-end">
          <div className="flex flex-row justify-center items-center gap-3">
            <ShoppingCart className="h-[10vh] w-[10vw] text-color1" />

            <button onClick={cambiarEstadoSearch}>
              {!estadoSearch ? (
                <MagnifyingGlassIcon className="h-8 w-8 text-color1" />
              ) : (
                <XMarkIcon className="h-8 w-8 text-color2" />
              )}
            </button>

            <div className="   flex flex-col justify-center gap-10 font text-1xl">
              {estadoMenu ? (
                <button onClick={cambiarEstadoMenu}>
                  <XMarkIcon className="h-10 w-10 text-color2" />
                </button>
              ) : (
                <button onClick={cambiarEstadoMenu}>
                  <Bars3Icon className="h-10 w-10 text-color1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {estadoMenu && (
          <div className="flex flex-col font-poppins text-2xl text-color3 absolute z-10 left-0 right-0 rounded-b-lg lg:items-end  md:items-end">
            <div className="bg-color1 flex flex-col pr-8 pl-5 pt-6 pb-8 rounded-b-lg">
              {session && (
                <div className="flex flex-row items-center mb-4 gap-2 text-white">
                  <img
                    src={session.user.image}
                    alt="user-image"
                    className="w-16 h-16 rounded-full bg-gray-500"
                  />
                  {session.user.name}
                </div>
              )}

              {userData?.data?.username && (
                <div className="flex flex-row items-center mb-4 gap-2 text-white">
                  {userData?.data?.username}
                </div>
              )}
              {userData?.data?.role === "admin" && (
                <Link href="/dashboard">
                  <button className="border-b font-poppins pb-1 w-40 text-left hover:text-white">
                    Panel Admin
                  </button>
                </Link>
              )}

              {Object.entries(rutas).map(([rut, nombre]) => (
                <Link href={rut} key={rut}>
                  <button className="border-b pb-1 w-40 text-left hover:text-white">
                    {nombre}
                  </button>
                </Link>
              ))}
              {(userData?.data?.role === "user" || session) && (
                <Link href="/mispedidos">
                  <button className="border-b pb-1 w-40 text-left hover:text-white">
                    Mis ordenes
                  </button>
                </Link>
              )}
              {session || userData?.data?.username ? (
                <button
                  type="button"
                  className="border-b pb-1 text-color2 w-40 text-left"
                  onClick={handleSignOut}
                >
                  Cerrar sesión
                </button>
              ) : (
                <>
                  <Link href="/login">
                    <button
                      type="button"
                      className="border-b pb-1 text-color2 w-40 text-left"
                      onClick={handleSignInState}
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        {estadoSearch && (
          <div className="bg-color1 border-b-2 border-color1 rounded-b-lg absolute z-10 w-full">
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
