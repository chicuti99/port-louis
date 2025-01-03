import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    userId: string;
    abilityId: string;
    yearsExperience: number;
}

class CreateUserAbilitieUseCase {
    async execute({ userId, abilityId, yearsExperience }: IRequest): Promise<void> {
        const prisma = new PrismaClient();

        if (yearsExperience < 0) {
            throw new AppError("O valor de yearsExperience deve ser maior ou igual a 0");
        }

        const ability = await prisma.ability.findUnique({
            where: { id: abilityId },
        });

        if (!ability) {
            throw new AppError("Habilidade não encontrada");
        }

        if (!ability.active) {
            throw new AppError("A habilidade não está ativa e não pode ser associada");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userAbilitiesAlreadyExists = await prisma.usersAbilities.findMany({
            where: {
                userId: userId
            }
        })

        userAbilitiesAlreadyExists.map((abilitie) => {
            if(abilitie.abilityId === abilityId){
                throw new AppError("ability already exists")
            }
        })

        await prisma.usersAbilities.create({
            data: {
                userId,
                abilityId,
                yearsExperience,
            },
        });
    }
}

export { CreateUserAbilitieUseCase };
