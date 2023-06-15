const jwt = require('jsonwebtoken');
require('dotenv').config();
const enviarEmailPassword = require('../Correos/mailPassword')

const generarToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

    const recuperarPass = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Generar el token
      const token = generarToken(email);
  
      // Enviar el correo electrónico con el token
      await enviarEmailPassword(email, token);
      
      return res.status(200).json({ message: 'Correo electrónico enviado' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  
  module.exports = recuperarPass;