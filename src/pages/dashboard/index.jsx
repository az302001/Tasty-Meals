import React from "react";
import Layaout from "@/components/Layaout/Layaout";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { useRouter } from "next/router";
import { PageProtection } from "@/Hocs/sesionVerify";

import AdminRoute from "@/components/AdminRoute/AdminRoute";

const dashboard = () => {
  const router = useRouter();

  return (
    <AdminRoute>
      <Layaout>
        <div>
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-8 w-8 text-color1" />
          </button>
          <div className="flex flex-col items-center ">
            <button onClick={() => router.back()}></button>
            <h2 className="font-sans font-bold text-3xl text-color1 m-10">
              Panel de Administrador
            </h2>
            <Link href="/dashboard/products">
              <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6 hover:font-bold ">
                VER Y MODIFICAR PRODUCTOS
              </button>
            </Link>
            <Link href="/dashboard/create">
              <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6 hover:font-bold">
                AGREGAR NUEVOS PRODUCTOS
              </button>
            </Link>

            <Link href="/dashboard/users">
              <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6 hover:font-bold">
                GESTION DE USUARIOS
              </button>
            </Link>
            {/* <Link href="/dashboard/create"> */}

            <Link href="/dashboard/discount">
              <button className="bg-color1 w-3/6 h-16 drop-shadow-2xl mb-10 text-color3 text-lg lg:w-2/6 hover:font-bold">
                GESTION DE DESCUENTOS
              </button>
            </Link>
          </div>
        </div>
      </Layaout>
    </AdminRoute>
  );
};

export default PageProtection(dashboard);
