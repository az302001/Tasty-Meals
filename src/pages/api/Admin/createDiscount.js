import prisma from "@/prisma/prisma";


export default async function handler (req, res) {
    const { method, body } = req;

    switch (method) {
        case 'PATCH':
            const { categoryId, discount } = body;
            try {
                const updateFoods = await prisma.food.updateMany({
                    where:{categoryId: categoryId},
                    data: {discount: discount},
                });
                // const foods = await prisma.food.findMany({
                //     where: {categoryId: categoryId},
                // });
                res.status(200).json(updateFoods);
            } catch (error) {
                res.status(500).json({ error: error.message });
            };
            break;
    
        default:
            res.status(500).json({ error: "ocurrio un error" });
            break;
    };
};