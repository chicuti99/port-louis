import "reflect-metadata";
import { Request, Response } from "express";
import { CriarGrupoUseCase } from "./criarGrupoUseCase";
import { container } from "tsyringe";

class CriarGrupoController {
    async handle(request:Request,response:Response): Promise<Response>{
        const {nome} = request.body;
        const criarGrupoUseCase = container.resolve(CriarGrupoUseCase);
        const grupo = await criarGrupoUseCase.execute({nome})
        return response.send(grupo).status(200)
    }
}

export {CriarGrupoController}