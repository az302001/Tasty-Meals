
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body} = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany({
          include: {
            Review: {
              include: {
                food: true
              }
            }
          }
        });

        return res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ error: error });
      }
      break;

    default:
      res.status(500).json({ error: "Unknown method" });
      break;
  }
}
