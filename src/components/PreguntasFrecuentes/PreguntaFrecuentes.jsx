import preguntas from '@/Data/Q&A';
import { Modal, Typography, Box, Button } from '@mui/material';
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
      <h2 className="font-semibold  text-color1 lg:text-2xl mb-2 text-xl">Preguntas frecuentes</h2>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <Typography
            variant="h6"
            component="h4"
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              mb: 2,
              
              '&:hover': {
                color: '#70A6A3',
              },
              fontFamily: 'Manrope'
            }}
            onClick={() => abrirModal(pregunta.id)}
          >
            {pregunta.pregunta}
          </Typography>
          <Modal
            open={preguntaSeleccionada === pregunta.id}
            onClose={cerrarModal}
            aria-labelledby="modal-title"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#F5E9CF',
                boxShadow: 24,
                p: 4,
                maxWidth: 600, 
                width: '90%',
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '0.5em'
              }}
            >
              <Typography variant="h6" component="h3" id="modal-title" sx={{ mb: 2, color: '#4D455D',fontSize: '2rem',fontFamily: 'Pacifico', }}>
                {pregunta.pregunta}
              </Typography>
              <Typography variant="body1" sx={{fontSize: '1.45em',fontFamily:'Josefin', color: '#E96479'}}>{pregunta.respuesta}</Typography>
              <Button variant="contained" onClick={cerrarModal} sx={{ mt: 2, alignSelf: 'center', backgroundColor:'#4D455D',
              '&:hover': {backgroundColor:'#2639A6'}, fontSize:'' }}>
                Cerrar
              </Button>
            </Box>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default PreguntaFrecuentes;