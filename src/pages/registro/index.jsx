import React, { useState } from "react";
import axios from "axios";
import Layaout from "@/components/Layaout/Layaout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldBlur, setFieldBlur] = useState(false);
  const [fieldClicked, setFieldClicked] = useState(false);
  const router = useRouter();
  const Swal = require("sweetalert2");

  const handleBlur = () => {
    setFieldBlur(true);
  };

  const handleClick = () => {
    setFieldClicked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos están completos
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    // Validar el formato del correo electrónico
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Correo electrónico inválido");
      return;
    }
    // Validar el formato del campo "name"
    if (!/^[A-Za-z\s]+$/.test(name)) {
      toast.error("El nombre solo debe contener letras y espacios");
      return;
    }

    // Verificar si la contraseña y la confirmación de contraseña coinciden
    if (password !== confirmPassword) {
      toast.error("La contraseña y la confirmación de contraseña no coinciden");
      return;
    }

    try {
      // Envía una solicitud POST al endpoint /api/register en el backend
      const response = await axios.post("/api/Register/Register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setConfirmPassword("");
        Swal.fire("¡Registro exitoso!", "sera redirigido al login", "success");
        setTimeout(() => {
          // Redirigir al usuario a la página de inicio de sesión
          router.push("/login");
        }, 2000);
        // } else if (response.status === 409) {
        //   setError("El correo electrónico ya está registrado");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo ya existente!",
      });
    }
  };

  return (
    <Layaout>
      <div>
        <ToastContainer />
        {success ? (
          <p>Registro exitoso</p>
        ) : (
          <div class="container mx-auto py-8">
            <h1 class="text-2xl font-bold mb-6 text-center">
              Formulario de Registro
            </h1>
            <form
              onSubmit={handleSubmit}
              class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
            >
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div class="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !name && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  type="text"
                  id="name"
                  name="name"
                  title="Por favor, ingrese solo letras y espacios."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                  onClick={handleClick}
                  placeholder="Ingrese su Nombre"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !email && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  id="email"
                  name="email"
                  placeholder="Ejemplo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !password && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !confirmPassword && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <button
                class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </Layaout>
  );
};

export default RegisterForm;
