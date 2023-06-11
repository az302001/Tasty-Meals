import mercadopago from "mercadopago";
import prisma from "@/prisma/prisma";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

const handler = async (req, res) => {
  const { query } = req;
  const topic = query.topic || query.type;
  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status; // puede ser "approved" o cualquier otro estado
      console.log(payment,"<---PAYMENT", paymentStatus, "<---STATUS")
      if (paymentStatus === "approved") {
        //const userId = req.userId; // ID del usuario que realizó el pago
        const productIds = req.body.productIds; // array de IDs de platos
        const cost = req.body.cost; // Costo de la transacción

        // Crear la transacción 
        // const transaction = await prisma.transaction.create({
        //     data: {
        //       userId,
        //       cost,
        //     },
        //   });
        //   const transactionId = transaction.id;
        //   for (const foodId of productIds) {
        //     await prisma._FoodToTransaction.create({
        //       data: {
        //         A: foodId,
        //         B: transactionId,
        //       },
        //     });
        //   }
          res.status(200).json("Se creó correctamente la transacción.")
      } else{
        res.status(500).json({ error: error.message })
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;