import React, { useEffect, useState } from "react";
import axios from "axios";
import Layaout from "@/components/Layaout/Layaout";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import Loader from "@/components/Loader/index";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

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
    if (evaluatePasswordStrength(password)  === "Débil") {
      toast.error(
        "La contraseña es débil. Por favor, elige una contraseña más segura. Incluya números y mayúscula"
      );
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
  const evaluatePasswordStrength = (password) => {
    let strength = "";

    if (password.length < 6) {
      strength = "Débil";
    } else if (
      /\d/.test(password) &&
      /[a-zA-Z]/.test(password) &&
      /[A-Z]/.test(password)
    ) {
      strength = "Fuerte";
    } else if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
      strength = "Medio";
    } else {
      strength = "Débil";
    }

    return strength;
  };

  const passwordColorClass = (strength) => {
    switch (strength) {
      case "Débil":
        return "text-red-500"; // Red color class
      case "Medio":
        return "text-yellow-500"; // Yellow color class
      case "Fuerte":
        return "text-green-500"; // Green color class
      default:
        return ""; // Default color class (if strength is not valid)
    }
  };

  return (
    <Layaout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Formulario de Registro
        </h1>
        {success ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-white p-8 rounded-md shadow-md"
          >
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre (*)
                <span className="float-right text-sm text-gray-500">
                  (*) Campos obligatorios
                </span>
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
              />
              {fieldBlur && !name && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor, ingrese su nombre.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Correo Electronico (*)
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
              {fieldBlur && !email && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor, ingrese su correo electrónico.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Contraseña (*)
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !password && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    evaluatePasswordStrength(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-2 top-5 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                </button>
                {password && (
                  <p className="text-sm mt-1">
                    Nivel de seguridad:{" "}
                    <span
                      className={passwordColorClass(
                        evaluatePasswordStrength(password)
                      )}
                    >
                      {evaluatePasswordStrength(password)}
                    </span>
                  </p>
                )}
              </div>
              {fieldBlur && !password && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor, ingrese su contraseña. Incluya números, letras y
                  mayúsculas
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="confirm-password"
              >
                Confirmar Contraseña (*)
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 border ${
                    fieldBlur && !confirmPassword && "border-red-500"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              {fieldBlur && !confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor, confirme su contraseña.
                </p>
              )}
            </div>
            <button
              className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit"
            >
              Registrar
            </button>
          </form>
        )}
      </div>
    </Layaout>
  );
};

export default RegisterForm;
