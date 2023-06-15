import bcrypt from 'bcrypt';
import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: `Ya existe un usuario con el correo electrónico ${email}` });
      return;
    }

    // Cifra la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta un nuevo usuario en la base de datos
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
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
