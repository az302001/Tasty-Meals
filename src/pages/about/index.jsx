import nosotros from "@/Data/nosotros";
import Image from "next/image";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import Link from "next/link";
import Layaout from "@/components/Layaout/Layaout";

export default function AboutUs() {
  return (
    <Layaout>
      <section className="text-center mb-20 mt-10">
        <h2 className="mb-4 text-xl font-semibold text-color1">
          Equipo de TastyMeals
        </h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-4/6 mx-auto">
          {nosotros.map((persona) => {
            return (
              <section
                key={persona.nombre}
                className="flex flex-col items-center justify-center rounded-lg drop-shadow-lg bg-gray-200 pt-4 pb-4 h-fit"
              >
                <div className="w-20 h-20 md:w-40 md:h-40 relative ">
                  <Image
                    src={persona.avatar}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    alt={`${persona.nombre} avatar`}
                  />
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="flex items-center">
                    <a
                      href={persona.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={github}
                        width={40}
                        height={40}
                        alt={`${persona.nombre} github`}
                      />
                    </a>
                    <a
                      href={persona.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <Image
                        src={linkedin}
                        width={40}
                        height={40}
                        alt={`${persona.nombre} linkedin`}
                        className="cursor-pointer"
                      />
                    </a>
                  </div>
                </div>
                <li className="font-semibold mt-2 rounded-md text-color1 bg-color3 h-fit">
                  {persona.nombre}
                </li>
              </section>
            );
          })}
        </ul>

        <secion className="flex flex-col items-center m-10">
          <hr className="w-4/6 lg:w-2/6 border-2 mb-4 border-color1 border-opacity-50 text-center"></hr>

          <h2 className="font-semibold text-xl text-color1">
            Sobre el proyecto
          </h2>
          <h3 className="w-3/6 text-center font-semibold text-color1 p-4">
            ¡Hola! Somos un grupo de 8 desarrolladores graduados del bootcamp
            SoyHenry y hemos creado un emocionante proyecto: 🌟 una carta
            virtual de restaurante. Utilizamos tecnologías como Next.js,
            Tailwind CSS, Prisma y PostgreSQL para desarrollar esta plataforma
            innovadora. Implementamos una pasarela de pago segura 💳 y un
            sistema de inicio de sesión y autenticación de terceros 🔒. Estamos
            orgullosos de compartir este proyecto contigo y estamos disponibles
            para responder cualquier pregunta que tengas. ¡Gracias por visitar
            nuestra página! 🚀🍽️🍽️
          </h3>
        </secion>
      </section>
    </Layaout>
  );
}
