import prisma from "@/prisma/prisma";
import { decodeToken, verifyToken } from "@/utils/jwt.handle";



export default async function handler({body}, res) {
    const { token } = body;
    const sesionVerify = verifyToken(token)


    if (!sesionVerify) {
        res.status(401).json({ message: "Sesión caducada", token: null });
    }
    const email = await decodeToken(token)

   

    const user = await prisma.user.findUnique({
        where: {
            email:email
        }
    })
    //La data que le llega al response
    res.status(200).json({token, username: user.name, id:user.id, role: user.role})
};