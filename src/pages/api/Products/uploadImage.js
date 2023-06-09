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
  const { method } = req;

  if (method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error al procesar la imagen:", err);
          return res.status(500).json({ error: "Error al procesar la imagen" });
        }

        const { file } = files;

        if (!file) {
          return res
            .status(400)
            .json({ error: "No se ha proporcionado ningún archivo" });
        }

        const cloudinaryUpload = await cloudinary.uploader.upload(file.path);
        const imageUrl = cloudinaryUpload.secure_url;

        return res.status(200).json({ imageUrl });
      });
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      res.status(500).json({ error: "Error al cargar la imagen" });
    }
  } else {
    res.status(404).json({ error: "Ruta no encontrada" });
  }
}
