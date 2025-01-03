import  "reflect-metadata"
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

interface IRequest{
    id:number;
    nome:string;
}
class AtualizarGrupoUseCase{
    async execute({id,nome}:IRequest){

        const prisma = new PrismaClient();
        const grupoJaCriado = prisma.grupo.findUnique({
            where:{id}
        })

        if(!grupoJaCriado){
            throw new AppError('Grupo não existe')
        }

        const grupoCriado = prisma.grupo.update({
            where: {id},
            data:{
                nome
            }
        })

        return grupoCriado;
    }
}

export {AtualizarGrupoUseCase}