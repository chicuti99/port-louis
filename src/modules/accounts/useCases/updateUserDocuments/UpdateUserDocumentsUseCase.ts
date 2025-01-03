import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    user_id: string;
    document_name: string;
    document_path: string;
}

class UpdateUserDocumentsUseCase {
    async execute({ user_id, document_name, document_path }: IRequest): Promise<void> {
        const prisma = new PrismaClient();

        const userExists = await prisma.user.findUnique({
            where: { id: user_id },
        });

        if (!userExists) {
            throw new AppError("Usuário não encontrado!", 404);
        }

        await prisma.userDocument.create({
            data: {
                name: document_name,
                url: document_path,
                userId: user_id,
            },
        });
    }
}

export { UpdateUserDocumentsUseCase };
