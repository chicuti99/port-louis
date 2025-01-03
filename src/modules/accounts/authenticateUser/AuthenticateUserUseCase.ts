import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

interface IRequest {
    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string,
        email:string
    };
    token:string
}

class AuthenticateUserUseCase{


    async execute({email,password}:IRequest):Promise<IResponse>{
        const prisma = new PrismaClient()
        const user = await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            throw new AppError("usuario ou email incorreto");
        }
        const passwordMatch = await compare(password,user.password);
    
        if(!passwordMatch){
            throw new AppError("usuario ou email incorreto");
        }

        const jwtSecret = process.env.JWT_SECRET || "";

        const token = sign({},jwtSecret,{
            subject:user.id,
            expiresIn:"1d"
        });

        const tokenReturn:IResponse = {
            token:token,
            user : {
                name:user.name,
                email:user.email
            }
        } 
        return tokenReturn
    }
}

export {AuthenticateUserUseCase }