import  "reflect-metadata"
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
interface IRequest{
    nome:string
}

interface GrupoCriado{
    nome:string;
    id:number
}

class CriarGrupoUseCase{
    async execute({nome}:IRequest):Promise<GrupoCriado>{
        const prisma = new PrismaClient();
        const grupo =await  prisma.grupo.findMany({
            where : {nome}
        })
        console.log(grupo)
        if(grupo.length < 0){
            throw new AppError("grupo ja existe",400)
        }
        const grupoCriado = await prisma.grupo.create({
            data :{
                nome
            }
        })

        
        return grupoCriado
    }
}

export {CriarGrupoUseCase}