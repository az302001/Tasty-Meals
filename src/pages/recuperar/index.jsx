import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { recuperarPasswordRequest } from '../../redux/actions/index';
import Layaout from '@/components/Layaout/Layaout';

const RecuperarPass = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      dispatch(recuperarPasswordRequest(email));


      setEmail('');
      setErrorMessage('');


      toast.success(
        <div>
          <h3 className="font-bold text-lg">Solicitud enviada con éxito</h3>
          <p className="mt-2">Por favor, revisa tu correo electrónico para obtener instrucciones sobre cómo restablecer tu contraseña.</p>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false, // No se cerrará automáticamente
          closeOnClick: true, // Cerrar al hacer clic en la notificación
          draggable: true, // Arrastrar para cerrar la notificación
          closeButton: true // Mostrar botón de cierre
        }
      );
    } catch (error) {
      console.error(error);

      setErrorMessage('Error al enviar la solicitud');
    }

    setIsLoading(false);
  };

  return (
    <Layaout>
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      </div>
    </div>
    </Layaout>
  );
};

export default RecuperarPass;

