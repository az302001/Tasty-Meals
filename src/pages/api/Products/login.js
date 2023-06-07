// import prisma from "@/prisma/prisma";
// import bcrypt from "bcrypt";



// export default async function handler(req, res){
//     const { method, body } = req;


//     switch (method) {
//         case 'POST':
//             const { email, password } = body;
//             const existingUser = await prisma.user.findUnique({
//                 where: {email:email}
//             });
//             if (existingUser) {
//                 const dbPassword = existingUser.password;
//                 bcrypt.compare(password, dbPassword)
//                 .then((match) => {
//                     if (!match) {
//                         res.status(400).json({error: 'Contraseña incorrecta'});
//                     } else {
//                         res
//                         .status(400)
//                         .json({ error: `Ya existe un usuario con este email: ${email}` });
//                     }
//                 })
//             } else {
//                 bcrypt.hash(password, 10)
//                 .then(async (hash) => {
//                    prisma.user.create({
//                       data:{
//                           email: email,
//                           password: hash,
//                       }
//                     })
//                     .then(() => {
//                         res.status(200).json({msg: "Usuario creado"});
//                     })
//                 }).catch((err) => {
//                   if (err) {
//                       res.status(400).json({error: err});
//                   }
//                 });
//             }
//             break;
//         default:
//             res.status(500).json({ error: 'Ocurrió un error, intente nuevamente.'})
//             break;
//     };
// };
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      const { email, password } = body;

      try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // El usuario ya existe, verificar la contraseña
          const dbPassword = existingUser.password;
          const match = await bcrypt.compare(password, dbPassword);

          if (match) {
            // Las credenciales son válidas, iniciar sesión exitosamente
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
          } else {
            // Contraseña incorrecta
            res.status(400).json({ error: 'Contraseña incorrecta' });
          }
        } else {
          // El usuario no existe, realizar el registro
          const hashedPassword = await bcrypt.hash(password, 10);

          await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });

          res.status(200).json({ message: 'Registro exitoso' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
      }

      break;

    default:
      res.status(405).json({ error: 'Método no permitido' });
      break;
  }
};
