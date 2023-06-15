import prisma from "@/prisma/prisma";
import nodemailer from 'nodemailer'

export default async function mailSend(email, pass) {
    try {
        const mail = await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            select: {
                email: true,
                name: true,
                password: true,
            },
        })

        // const transporter = nodemailer.createTransport({
        //     host: 'outlook.office365.com',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.OUTLOOK_EMAIL,
        //         pass: process.env.OUTLOOK_PASSWORD
        //     }
        // });
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        })
        const mailOptions = {
            from: 'Tasty Meals',
            to: mail.email,
            subject: 'Restaurar Contraseña',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                     <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <div class="">
                        <div class="">
                            <h1 class="">Información de la contraseña de tu cuenta en Tasty Meals</h1>
                            <p class="">Estimado/a ${mail?.name},</p>
                            <p class="">Hemos recibido una solicitud para restablecer tu contraseña en Tasty Meals. Como lo solicitaste, aquí está tu nueva contraseña:</p>
                            <h4>${pass}</h4>
                            <p class="">Por razones de seguridad, te recomendamos que cambies tu contraseña lo antes posible. Para hacerlo, inicia sesión en tu cuenta y accede a la configuración de tu perfil. Allí encontrarás la opción para cambiar tu contraseña.</p>
                            <p class="">Si no has solicitado un restablecimiento de contraseña, por favor, ignora este correo electrónico y ponte en contacto con nuestro equipo de soporte inmediatamente. Queremos asegurarnos de que tu cuenta esté protegida y segura en todo momento.</p>
                            <p class="">Gracias por usar Tasty Meals.</p>
                            <p class="">Saludos cordiales,</p>
                            <p class=""><b>Equipo de soporte - Tasty Meals</b></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        const info = await transporter.sendMail(mailOptions)
        return { success: info, message: 'Passed. Email sent.' }

    } catch (err) {
        console.error(err.message)
        return { error: err.message }
    }
}
