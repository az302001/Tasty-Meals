import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
    const { method } = req;

  switch (method) {
    case "PUT":
        const { id } = req.body;
          // Obtener todas las reseñas de la comida
        const reviews = await prisma.review.findMany({
            where: {
              foodId: parseInt(id),
            },
          });
          // Calcular el nuevo rating basado en las reseñas existentes
        let totalRating = 0;
        let averageRating = 0;

        if (reviews.length > 0) {
          totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          averageRating = totalRating / reviews.length;
        }

        // Actualizar el rating de la comida en la base de datos
        const updatedFood = await prisma.food.update({
          where: {
            id: parseInt(id),
          },
          data: {
            rating: averageRating,
          },
        });
        res.status(200).json(updatedFood);
    break;

    default:
      res.status(500).json({ error: "fallo" });
      break;
  }
}