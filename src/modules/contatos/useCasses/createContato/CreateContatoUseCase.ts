import  "reflect-metadata"
import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from "@prisma/client";
 interface IRequest {
    nome:string;
    telefone:string;
 }

 class CreateContatoUseCase {

    
    async execute({nome,telefone}:IRequest):Promise<IRequest>{
        const prisma = new PrismaClient();
        const ContatoExists = await prisma.contato.findFirst({
         where: {telefone}
        });

        if(ContatoExists){
         throw new AppError("Contato ja existe");
        }

         const contato = await prisma.contato.create({
            data: {
               nome:nome,
               telefone:telefone
            }
        })

        return contato
    }
 }

 export { CreateContatoUseCase}