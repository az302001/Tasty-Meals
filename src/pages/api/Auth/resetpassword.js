import prisma from "@/prisma/prisma";
import mailSend from "@/utils/restorePassword";
import bcrypt from 'bcrypt';

export default async function handle(req, res) {
    const { email } = req.body
    if (req.method === 'PUT') {
        if (email) {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        name: true,
                        password: true,
                    },
                })
                if (user?.name && user?.password !== null) {
                    let generador = ''
                    const characters =
                        '0123456789abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.?,;-_!*%&$/(){}|@><'
                    for (let i = 0; i < 8; i++) {
                        const aleatorio = Math.floor(Math.random() * characters.length)
                        generador += characters.charAt(aleatorio)
                    }
                    const newPass = `LRE21${generador}*`
                    const mail = await mailSend(email, newPass)
                    if (mail.success) {
                        const passwordhash = await bcrypt.hash(newPass, 10)
                        await prisma.user.update({
                            where: {
                                email: email,
                            },
                            data: {
                                password: passwordhash,
                            },
                        })
                        res.status(200).send(passwordhash)
                    } else {
                        res.status(400).send('error')
                    }
                } else {
                    res.status(400).send('error')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}