import React from "react";
import Layaout from "@/components/Layaout/Layaout";
import Link from "next/link";
const dashboard = () => {
  return (
    <Layaout>
      <div className="flex flex-col items-center ">
        <h2 className="font-sans font-bold text-3xl text-color1 m-10">
          Panel de Administrador
        </h2>
        <Link href="/dashboard/products">
          <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6 hover:font-bold ">
            VER Y MODIFICAR PRODUCTOS
          </button>
        </Link>
        <Link href="/dashboard/create">
          <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6">
            AGREGAR NUEVOS PRODUCTOS
          </button>
        </Link>

        <Link href="/dashboard/users">
          <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6">
            GESTION DE USUARIOS
          </button>
        </Link>
        <Link href="/dashboard/create">

        <Link href="/dashboard/discount">

          <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6">
            GESTION DE DESCUENTOS
          </button>
        </Link>
      </div>
    </Layaout>
  );
};

export default dashboard;
