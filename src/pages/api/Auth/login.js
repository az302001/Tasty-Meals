import prisma from "@/prisma/prisma";
import { signToken } from "@/utils/jwt.handle";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const { email, password } = body;

      // Validar si los campos están vacíos
      if (!email || !password) {
        res.status(400).json({
          error: "Debes ingresar un correo electrónico y una contraseña",
        });
        return;
      }

      try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          // El correo electrónico no está registrado
          res
            .status(400)
            .json({ error: "El correo electrónico no está registrado" });
          return;
        }

        if (existingUser) {
          // El usuario ya existe, verificar la contraseña
          const dbPassword = existingUser.password;
          const match = await bcrypt.compare(password, dbPassword);
          const token = await signToken({ email });
          if (match) {
            // Las credenciales son válidas, redirigir al dashboard si es admin
            if (existingUser.role === "admin") {
              const dashboardUrl = "/dashboard";
              res
                .status(200)
                .json({ dashboardUrl: "/dashboard", token, email,dashboardUrl });
              return;
            }else{

            res
              .status(200)
              .json({ message: "Inicio de sesión exitoso", token, email });
            }
          } else {
            // Contraseña incorrecta
            res.status(400).json({ error: "Contraseña incorrecta" });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
      }

      break;

    default:
      res.status(405).json({ error: "Método no permitido" });
      break;
  }
}
