import React, { useEffect, useState } from "react";
import Layaout from "@/components/Layaout/Layaout";
import Link from "next/link";
import Destacados from "@/components/Destacados/Destacados";
import { PageProtection } from "@/Hocs/sesionVerify";
import Loader from "@/components/Loader/index";
import PreguntaFrecuentes from "@/components/PreguntasFrecuentes/PreguntaFrecuentes";

const index = () => {
  const [isloading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);
  return (
    <Layaout>
      <header className="bg-color1 py-4">
        <div className="container mx-auto">
          <h1 className="text-color3 text-4xl font-bold text-center">Tasty Meals</h1>
          <p className="text-color3 text-lg text-center">Disfruta de los sabores más deliciosos</p>
        </div>
      </header>

      {isloading ? (
        <Loader />
      ) : (
        <>
      <div style={{ marginTop: "2rem" }}>
        <h1 className="text-color1 font-semibold text-center text-2xl lg:text-2xl mt-3 mb-7 bg-color3 rounded"></h1>
        <Destacados />
      </div>
      <Link href="/menu">
        <div className="flex flex-col justify-center items-center mt-8 bottom-0 left-0 right-0 p-4 text-center">
          <button
            type="button"
            class="text-white bg-color1 mb-6 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver Menu
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </Link>
      <hr className="w-4/6 lg:w-2/6 border-2 border-color1 border-opacity-50 ml-[34%]"></hr>
        <div className="text-center">
          <PreguntaFrecuentes/>
        </div>
        <div className="flex flex-col mt-4 items-center text-center">
          <hr className="w-4/6 lg:w-2/6 border-2 border-color1 border-opacity-50 text-center"></hr>
          <h2 className="font-semibold  text-color1 lg:text-2xl mb-2 text-xl">
            Sobre nosotros
          </h2>
          <p className="lg:w-3/6 w-5/6 font-semibold text-gray-600">
            ¡Hola! Somos un grupo de 8 desarrolladores graduados del bootcamp
            SoyHenry y hemos creado un emocionante proyecto: 🌟 una carta
            virtual de restaurante. Estamos orgullosos de compartir este
            proyecto contigo y estamos disponibles para responder cualquier
            pregunta que tengas. ¡Gracias por visitar nuestra página! 🚀🍽️🍽️
          </p>
          <Link href="/about">
            <button className="text-white m-4 bg-color1 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Conocé Más
            </button>
          </Link>
        </div>
      </>
      )}
    </Layaout>
  );
};

// export default index;

export default PageProtection(index);
