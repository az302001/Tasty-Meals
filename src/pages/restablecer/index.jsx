import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actualizarPassword } from '@/redux/actions';
import Layaout from '@/components/Layaout/Layaout';

const RestablecerContraseña = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNuevaContraseñaChange = (e) => {
    setNuevaContraseña(e.target.value);
  };

  const handleConfirmarContraseñaChange = (e) => {
    setConfirmarContraseña(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { token } = router.query;
    if (!token) {
      // Mostrar notificación de error
      toast.error('Error: No se verificó el mail', { position: toast.POSITION.CENTER });
      return;
    }

    if (nuevaContraseña === confirmarContraseña) {
      dispatch(actualizarPassword(nuevaContraseña, token));
      // Mostrar alerta de éxito
      toast.success('¡Contraseña actualizada con éxito!', { position: toast.POSITION.CENTER });
      setNuevaContraseña('');
      setConfirmarContraseña('');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    }
  };

  return (
    <Layaout>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nuevaContraseña">
              Nueva Contraseña:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nuevaContraseña"
              type="password"
              value={nuevaContraseña}
              onChange={handleNuevaContraseñaChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmarContraseña">
              Confirmar Contraseña:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmarContraseña"
              type="password"
              value={confirmarContraseña}
              onChange={handleConfirmarContraseñaChange}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Restablecer
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layaout>
  );
};

export default RestablecerContraseña;