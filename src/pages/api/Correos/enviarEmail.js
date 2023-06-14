import transporter from './mailConfig';

const enviarEmail = async (destinatario, contenido) => {
  try {
    const correoOptions = {
      from: 'tastymeals2023@gmail.com',
      to: destinatario,
      subject: 'Registro',
      text: contenido,
    };
    
    await transporter.sendMail(correoOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export default enviarEmail;