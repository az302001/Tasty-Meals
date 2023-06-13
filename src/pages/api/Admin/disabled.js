import prisma from "@/prisma/prisma";


export default async function handler (req, res) {
    const { method, body } = req;

    switch (method) {
        case 'PATCH':
            const { id, disabled } = body;
            try {
                const food = await prisma.food.update({
                    where:{id: parseInt(id)},
                    data: {disabled: disabled},
                });
                res.status(200).json(food);
            } catch (error) {
                res.status(500).json({ error: error.message });
            };
            break;
    
        default:
            res.status(500).json({ error: "ocurrio un error" });
            break;
    };
};
