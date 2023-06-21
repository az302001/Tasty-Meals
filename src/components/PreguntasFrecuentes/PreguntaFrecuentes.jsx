import preguntas from '@/Data/Q&A';
import { Modal } from '@mui/material';
import React, { useState } from 'react';

const PreguntaFrecuentes = () => {
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  const abrirModal = (id) => {
    setPreguntaSeleccionada(id);
  };

  const cerrarModal = () => {
    setPreguntaSeleccionada(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <h3
            className="cursor-pointer font-semibold mb-2 hover:underline"
            onClick={() => abrirModal(pregunta.id)}
          >
            {pregunta.pregunta}
          </h3>
          <Modal
            isOpen={preguntaSeleccionada === pregunta.id}
            onRequestClose={cerrarModal}
            className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md outline-none w-72 max-w-full z-50"
            overlayClassName="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          >
            <div className="modal-content max-h-72 overflow-y-auto">
              <h3 className="mb-4">{pregunta.pregunta}</h3>
              <p>{pregunta.respuesta}</p>
              <button
                className="modal-close bg-transparent border-none text-gray-500 hover:text-gray-700 cursor-pointer mt-4"
                onClick={cerrarModal}
              >
                Cerrar
              </button>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default PreguntaFrecuentes;