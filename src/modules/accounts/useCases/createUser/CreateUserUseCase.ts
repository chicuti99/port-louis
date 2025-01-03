import {ICreateUserDTO} from "../../dtos/ICreateUserDTO"
import {hash} from "bcryptjs"
import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from '@prisma/client'

class CreateUserUseCase{

    async execute({birthdate,email,name,password}:ICreateUserDTO):Promise<void>{
        const prisma = new PrismaClient();
        const emailAlreadyExists = await prisma.user.findUnique({
            where: {email}
        })
        if(emailAlreadyExists){
            throw new AppError("user already exists");
        }
        const passwordHash = await hash(password,8);
        const tesste = await prisma.user.create({
            data:{
                birthdate:birthdate,
                email:email,
                name:name,
                password:passwordHash,

            }
        });
        console.log(tesste)
    }
}

export {CreateUserUseCase}