import prisma from "@/prisma/prisma";
import cloudinary from "cloudinary";
import formidable from "formidable-serverless";

cloudinary.config({
  cloud_name: "di92lsbym",
  api_key: "645367484892848",
  api_secret: "jya3Le1E2H_ZfA2UbL9MamjgqQI",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      console.log(files);
      if (err) {
        console.error("Error al procesar la imagen:", err);
        res.status(500).json({ error: "Error al procesar la imagen" });
        return;
      }
      if (!files.image) {
        console.log(files.image);
        res.status(400).json({ error: "No ha enviado una imagen" });
        return;
      }

      const { name, price, description, Category, rating, discount } = fields;
      const category = JSON.parse(Category);
      const imageUrl = await uploadImage(files.image);

      try {
        const existingFood = await prisma.food.findFirst({
          where: { name: name },
        });

        if (existingFood) {
          return res
            .status(400)
            .json({ error: `Ya existe una comida con el nombre ${name}` });
        }

        const createdFood = await prisma.food.create({
          data: {
            name: name,
            price: parseFloat(price),
            description: description,
            image: imageUrl,
            Category: {
              connect: {
                id: parseInt(category.connect.id),
              },
            },
            rating: parseInt(rating),
            discount: parseInt(discount),
            quantity: 0,
          },
        });

        return res.status(201).json({
          mensaje: `El plato ${name} se ha creado correctamente`,
          food: createdFood,
        });
      } catch (error) {
        console.error("Error al almacenar el objeto:", error);
        res.status(500).json({
          error: "Ocurrió un error al almacenar el objeto, intente nuevamente.",
        });
      }
    });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}

async function uploadImage(imageFile) {
  try {
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "samples",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error);
    throw new Error("Error al subir la imagen");
  }
}
