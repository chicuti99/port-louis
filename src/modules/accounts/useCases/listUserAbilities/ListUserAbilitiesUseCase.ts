import { PrismaClient } from "@prisma/client";

interface IRequest {
    userId: string;
    page: number;
    limit: number;
}

class ListUserAbilitiesUseCase {
    async execute({ userId, page, limit }: IRequest) {
        const prisma = new PrismaClient();

        const offset = (page - 1) * limit;

        const userAbilities = await prisma.usersAbilities.findMany({
            where: {
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        birthdate: true,
                        createdAt: true,
                        updatedAt: true,
                        password: false,
                    },
                },
                ability: true, 
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: offset,
            take: limit,
        });

        const totalAbilities = await prisma.usersAbilities.count({
            where: {
                userId,
            },
        });

        return {
            data: userAbilities,
            total: totalAbilities,
            page,
            limit,
        };
    }
}

export { ListUserAbilitiesUseCase };
