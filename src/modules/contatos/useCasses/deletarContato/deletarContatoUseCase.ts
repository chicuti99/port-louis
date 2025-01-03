import  "reflect-metadata"
import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from "@prisma/client";
interface IRequest{
    id:number
}
class DeletarContatoUseCase{
    async execute({id}:IRequest):Promise<void> {
        const prisma = new PrismaClient()
        const contato = prisma.contato.findUnique({
            where: {id}
        })

        if(!contato){
            throw new AppError("Contato não encontrado",400)
        }

        await prisma.contato.delete({
            where:{id}
        })
    }
}

export {DeletarContatoUseCase}