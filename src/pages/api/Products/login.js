import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";



export default async function handler(req, res){
    const { method, body } = req;


    switch (method) {
        case 'POST':
            const { email, password } = body;
            const existingUser = await prisma.user.findUnique({
                where: {email:email}
            });
            if (existingUser) {
                const dbPassword = existingUser.password;
                bcrypt.compare(password, dbPassword)
                .then((match) => {
                    if (!match) {
                        res.status(400).json({error: 'Contraseña incorrecta'});
                    } else {
                        res
                        .status(400)
                        .json({ error: `Ya existe un usuario con este email: ${email}` });
                    }
                })
            } else {
                bcrypt.hash(password, 10)
                .then(async (hash) => {
                   prisma.user.create({
                      data:{
                          email: email,
                          password: hash,
                      }
                    })
                    .then(() => {
                        res.status(200).json({msg: "Usuario creado"});
                    })
                }).catch((err) => {
                  if (err) {
                      res.status(400).json({error: err});
                  }
                });
            }
            break;
        default:
            res.status(500).json({ error: 'Ocurrió un error, intente nuevamente.'})
            break;
    };
};