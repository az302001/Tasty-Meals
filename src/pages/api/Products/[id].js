import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const product = await prisma.food.findUnique({
          where: { id: parseInt(id) },
          include: {
            Category: {
              select: {
                name: true,
              },
            },
          },
        });
        if (!product) {
          return res.status(404).json({ error: "producto no encontrado" });
        }

        return res.status(200).json({ product });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      break;

    case "POST":
      try {
        const { name } = body;
        const existingFood = await prisma.food.findFirst({
          where: { name: name },
        });

        if (existingFood) {
          return res
            .status(400)
            .json({ error: `Ya existe una comida con el nombre ${name}` });
        }
        //si llega acá, implica que no existía.
        await prisma.food.create({ data: body });
        return res
          .status(201)
          .json({ mensaje: `Platillo almacenado con éxito!` }); //si lo creó, no lo retorna al objeto sino un mensaje de éxito.
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id, ...data } = body;
        await prisma.food.update({
          where: { id: parseInt(id) },
          data,
        });
        res.status(200).json({
          mensaje: `El plato ${data.name} se ha modificado correctamente.`,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await prisma.food.delete({
          where: { id: parseInt(id) },
        });
        res.status(200).json({ mensaje: `Plato removido correctamente!` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(500).json({ error: "ocurrio un fallo" });

      break;
  }
}
