import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo-tasty.png";
import Link from "next/link";
import Google from "@/assets/google.png";
import Facebook from "@/assets/facebook.png";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import GoogleLogin from "@/components/GoogleLogin/GoogleLogin";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar una solicitud al backend para verificar las credenciales del usuario
    fetch("/api/Products/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del backend
        if (data.error) {
          // Mostrar mensaje de error en caso de credenciales incorrectas
          toast.error(data.error);
        } else {
          // Redirigir al usuario a la página de inicio después de iniciar sesión correctamente
          router.push("/home");
        }
      })
      .catch((error) => {
        // Manejar errores de conexión o del servidor
        console.error("Error en la solicitud:", error);
      });
  };
  return (
    <section onSubmit={handleSubmit} className="flex flex-col items-center bg-color3 h-screen w-screen">
      <ToastContainer />
      <div className="flex flex-wrap mt-6 w-64 h-56 max-w-sm">
        <Image src={Logo} alt={"tasty-meals-logo"} />
      </div>
      <form className="flex flex-col items-center">
        <label htmlFor="user" className="text-color1 text-xl mb-2 font-josefin">
          Correo:
        </label>
        <div className="relative flex items-center ">
          <EnvelopeIcon className="text-color4 w-5 h-5 absolute ml-2" />
          <input
            type="text"
            name="user"
            placeholder="Ingrese su correo aquí"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-8 h-8 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col items-center p-6">
          <label
            htmlFor="password"
            className="text-color1 text-xl mb-2 font-josefin"
          >
            Contraseña:
          </label>
          <div className="relative flex items-center ">
            <LockClosedIcon className="text-color4 w-5 h-5 absolute ml-2" />
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña aquí"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-8 h-8 rounded-lg placeholder:text-sm"
            ></input>
          </div>
        </div>
        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Entrar
          </button>
        

        <GoogleLogin />
      </form>
      <div className="flex justify-around w-full mt-5">
        <div className="inline-flex">
          <input type="checkbox"></input>
          <p className="ml-1">Recordarme</p>
        </div>
        <div>
          <p>Olvide mi contraseña</p>
        </div>
      </div>
      <hr className="w-48 h-1 mt-4 bg-color1"></hr>
      <p className="mt-5">
        No tengo usuario. <strong>Registrarme</strong>
      </p>
      <h2 className="mt-10">O registrarme con:</h2>
      <section name="social-media-logos" className="flex mt-4">
        <div name="facebook-login-logo" className="w-16 h-16">
          <Image src={Facebook} alt={"facebook-login"}></Image>
        </div>
        <div name="google-login-logo" className="w-14 h-14">
          <Image src={Google} alt={"google-login"}></Image>
        </div>
      </section>
    </section>
  );
};

export default index;
