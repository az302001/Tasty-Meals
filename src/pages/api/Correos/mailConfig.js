const nodemailer = require("nodemailer/lib/nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tastymeals2023@gmail.com",
      pass: "mxfatahjlfrnzutn",
    },
    tls: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado
      },
  });

module.exports = transporter;