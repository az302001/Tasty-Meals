import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import enviarEmail from "../Correos/enviarEmail";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { name, email, password, provider } = req.body;

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        message: `Ya existe un usuario con el correo electrónico ${email}`,
      });
      return;
    }

    // Cifra la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await prisma.user.count();

    // Inserta un nuevo usuario en la base de datos
    if (userCount === 0) {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "admin",
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user",
        },
      });
    }

    const destinatario = email;
    const contenido = `Gracias ${name} por registrarte en nuestra aplicación. Desde el staff de Tasty Meals, esperamos que disfrutes tu recorrido por la página.`;

    await enviarEmail(destinatario, contenido);

    res.status(200).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.status(405).json({ message: 'Method Not Allowed' });
//     return;
//   }

//   const { name, email, password } = req.body;

//   try {
//     // Verifica si el usuario ya existe en la base de datos
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       res.status(400).json({ message: `Ya existe un usuario con el correo electrónico ${email}` });
//       return;
//     }

//     // Cifra la contraseña antes de almacenarla en la base de datos
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Inserta un nuevo usuario en la base de datos
//     await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     res.status(200).json({ message: 'Registro exitoso' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// }
