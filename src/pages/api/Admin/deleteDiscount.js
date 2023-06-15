import prisma from "@/prisma/prisma";


export default async function handler (req, res) {
    const { method, body } = req;

    switch (method) {
        case 'PATCH':
            const { categoryId } = body;
            try {
                const updateFoods = await prisma.food.updateMany({
                    where:{categoryId: categoryId},
                    data: {discount: 0},
                });
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