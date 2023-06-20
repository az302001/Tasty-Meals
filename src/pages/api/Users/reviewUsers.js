import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
  try {
    const { userId, foodId, comentario, rating } = req.body;

    // Verificar si el usuario ya ha dejado una reseña para la comida
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: parseInt(userId),
        foodId: foodId,
      },
    });

    if (existingReview) {
      res.status(403).json({ error: "Ya has dejado una reseña para esta comida." });
    } else {
        // Crear la reseña
        const review = await prisma.review.create({
          data: {
            user: { connect: { id: parseInt(userId) } },
            food: { connect: { id: foodId } },
            comentary: comentario,
            rating,
          },
        });
        res.status(201).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error});
  }
  break;
  case "GET":
      try {
        const { foodId } = req.query;
        const reviews = await prisma.review.findMany({
          where: {
            foodId: parseInt(foodId),
          },
        });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las reseñas." });
      }
      break;
      case "PUT":
          try {
            const { reviewId } = req.query;
            const { userId, foodId, comentary, rating } = req.body;
            const review = await prisma.review.update({
              where: { id: parseInt(reviewId) },
              data: {
                user: { connect: { id: userId } },
                food: { connect: { id: foodId } },
                comentary,
                rating,
              },
            });
            res.status(200).json(review);
          } catch (error) {
            res.status(500).json({ error:error });
          }
          break;


          case "DELETE":
          try {
            const { reviewId } = req.query;
            const review = await prisma.review.delete({
              where: { id: parseInt(reviewId) },
            });
            res.status(200).json(review);
          } catch (error) {
            res.status(500).json({ error: "No se pudo eliminar la reseña." });
          }
          break;

        default:
          res.status(405).json({ error: "Método HTTP no permitido." });
          break;
      }
    }