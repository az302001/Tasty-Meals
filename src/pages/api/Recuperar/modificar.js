const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';


const modificarPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    //Decodifico el token para extraer el email
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //Extraigo el email
    const email = decodedToken.email;
    
    //Reviso que haya usuario
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Actualizo la pw
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
    } else {
      // No se encontró el usuario correspondiente al email del token
    return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Contraseña modificada con éxito' });
} catch (error) {
    
    return res.status(500).json({ error: 'Error en el servidor' });
}
};

module.exports = modificarPassword;