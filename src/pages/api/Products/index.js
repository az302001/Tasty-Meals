import foodsData from "@/Data/Comidas";
import categoriesData from "@/Data/categories";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { method } = req;
  const { name, category, price } = req.query;
  // const { category } = req.query;
  // const { price } = req.query

  switch (method) {
    //para insertar los productos en la base de datos

    case "POST":
      try {
        const existingCategories = await prisma.category.findMany();
        const existingFoods = await prisma.food.findMany();

        if (!existingCategories.length && !existingFoods.length) {
          const categories = await prisma.category.createMany({
            data: categoriesData,
          });
          const foods = await prisma.food.createMany({ data: foodsData });

          return res.status(201).json({ categories, foods });
        } else {
          return res.status(200).json({ existingCategories, existingFoods });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    //para buscar los productos por el nombre

    case "GET":
      try {
        if (name) {
          const GetproductByName = await prisma.food.findMany({
            where: {
              name: {
                contains: name,
                mode: "insensitive",
              },
              disabled: false,
            },
          });

          if (GetproductByName.length === 0) {
            return res
              .status(404)
              .json({ error: "El producto que está buscando no existe" });
          }

          return res.status(200).json({ GetproductByName });
        } else if (category) {
          const GetproductByCategory = await prisma.food.findMany({
            where: {
              Category: { name: category },
            },
            include: {
              Category: {
                select: {
                  name: true,
                },
              },
            },
          });

          if (GetproductByCategory.length === 0) {
            return res
              .status(404)
              .json({ error: "La categoría que busca no existe" });
          }

          return res.status(200).json({ GetproductByCategory });
        } else if (price) {
          const GetProductByPrice = await prisma.food.findMany({
            where: { price: parseFloat(price) },
          });

          return res.status(200).json({ GetProductByPrice });
        } else {
          const GetAllFoods = await prisma.food.findMany({
            include: {
              Category: {
                select: {
                  name: true,
                },
              },
            },
          });
          return res.status(200).json(GetAllFoods);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(500).json({ error: "fallo" });

      break;
  }
}
