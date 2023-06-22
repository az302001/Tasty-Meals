import transporter from './mailConfig';


const enviarEmailCompra = async (foodNames, cost, email) => {
    
try {
    const mailOptions = {
      from: 'tastymeals2023@gmail.com',
      to: email,
      subject: 'Resumen de compra',
      html: `
        <p>Hola,</p>
        <p>Gracias por tu compra en nuestro sitio. A continuación, te mostramos los detalles de la transacción:</p>
        <ul>
          <li>Comidas: ${foodNames}</li>
          <li>Precio total: ${cost}</li>
        </ul>
        <p>Si tienes alguna pregunta o inquietud, no dudes en comunicarte con nuestro equipo de soporte.</p>
        <p>¡Esperamos que disfrutes tu comida!</p>
        <p>Gracias,</p>
        <p>Equipo de Tasty Meals</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');

} catch (error) {
  console.error('Error al enviar el correo:', error);
}
}

module.exports = enviarEmailCompra;
