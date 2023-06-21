import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany({
          include: {
            Review: {
              include: {
                food: true,
              },
            },
          },
        });

        return res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ error: error });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const deletedUser = await prisma.user.delete({
          where: {
            id: parseInt(id),
          },
        });
        if (!deletedUser || isNaN(parseInt(id))) {
          res.status(404).json({ msj: "No hay usuarios con ese ID" });
        } else {
          res
            .status(200)
            .json({ msj: `El usuario ${deletedUser.name} ha sido eliminado` });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "Hubo un problema al eliminar el usuario" });
      }
    default:
      res.status(500).json({ error: "Unknown method" });
      break;
  }
}
