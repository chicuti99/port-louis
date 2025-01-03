import  "reflect-metadata"
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
interface IRequest{
    id:number
}

class DeletarGrupoUseCase {
    async execute({id}:IRequest):Promise<void>{
        const prisma = new PrismaClient();
        const grupoJaExiste = await prisma.grupo.findUnique({
            where:{id}
        })

        if(!grupoJaExiste){
            throw new AppError("Grupo não existe",400)
        }

        await prisma.grupo.delete({
            where:{id}
        })
    }
}

export {DeletarGrupoUseCase}
