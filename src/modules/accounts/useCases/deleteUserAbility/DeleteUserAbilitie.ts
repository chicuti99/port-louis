import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class DeleteUserAbilitie {
    async delete(request: Request, response: Response): Promise<Response> {
        const { abilityId } = request.body;
        const { id:userId } = request.user;
        console.log(abilityId) 
        const prisma = new PrismaClient();
        await prisma.usersAbilities.deleteMany({
            where: {
                abilityId: {
                    in: abilityId
                },
                userId:userId
            }
        })

        return response.status(200).send();
    }
}

export { DeleteUserAbilitie };
