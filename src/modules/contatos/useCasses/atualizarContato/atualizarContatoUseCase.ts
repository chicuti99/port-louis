import  "reflect-metadata"
import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id:number;
    nome:string;
    telefone:string;
}
class AtualizarContatoUseCase {
    async execute({id,nome,telefone}:IRequest):Promise<void> {
        const prisma = new PrismaClient();
        const contato = await prisma.contato.findUnique({
            where: {id:id}
        })

        if(!contato){
            throw new AppError('contato não encontrado',400)
        }

        await prisma.contato.update({
            where: {id:id},
            data:{
                nome,
                telefone
            }
        })


    }
}

export { AtualizarContatoUseCase }