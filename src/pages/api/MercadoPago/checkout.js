import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    const product = req.body.product;
    const URL = "https://tasty-meals.vercel.app/"; //ESTA URL HAY QUE CAMBIAR POR LA DEL DEPLOY
    try {
      const preference = {
        items: [
          {
            title: product.name,
            unit_price: product.price,
            quantity: 1,
          },
        ],
        auto_return: "approved",
        back_urls: {
          success: `${URL}/pagoexitoso`, //acá se puede redirigir al cliente a dónde se quiera una vez que el pago sea exitoso
          failure: `${URL}/pagoexitoso`,
        },
        notification_url: `${URL}/api/MercadoPago/notify`,
      };
      const response = await mercadopago.preferences.create(preference);
      res.status(200).send({ url: response.body.init_point });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ message: "metodo no disponible" });
  }
};

export default handler;
