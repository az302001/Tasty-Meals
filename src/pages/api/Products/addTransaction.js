import prisma from "@/prisma/prisma";

function validateTransactionData(foodsIds, costo, userId, approved) {
  if (!foodsIds || !costo || !userId || approved === undefined) {
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { foodsIds, costo, userId, approved } = req.body;
      if (validateTransactionData(foodsIds, costo, userId, approved)) {
        await prisma.transaction.create({
          data: {
            user: {
              connect: { id: userId },
            },
            cost: costo,
            approved: approved,
            food: {
              connect: foodsIds.map((foodId) => ({ id: foodId })),
            },
          },
        });

        res.status(200).json({ mensaje: "Transacción creada correctamente" });
      } else {
        res
          .status(400)
          .json({ mensaje: "Faltan datos para completar la transacción." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la transacción" });
    }
  }
}
