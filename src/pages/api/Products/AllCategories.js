import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const existingCategories = await prisma.category.findMany();
        res.status(200).json(existingCategories);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(500).json({ error: "fallo" });
      break;
  }
}
