import transporter from './mailConfig';

const enviarEmailPassword = async (email, token) => {
    try {
    const restablecerURL = `https://tasty-meals.vercel.app/restablecer?token=${token}`;
    const mailOptions = {
        from: 'tastymeals2023@gmail.com',
        to: email,
        subject: 'Restablecer contraseña',
        html: `
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña en nuestro sitio. Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
        <p>Si deseas restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <p><a href="${restablecerURL}">Restablecer contraseña</a></p>
        <p>El enlace es válido por 1 hora.</p>
        <p>Si tienes algún problema, comunícate con nuestro equipo de soporte.</p>
        <p>Gracias,</p>
        <p>Equipo de Tasty Meals</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = enviarEmailPassword;