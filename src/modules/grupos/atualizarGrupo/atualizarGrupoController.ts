import "reflect-metadata";
import { Request, Response } from "express";
import { AtualizarGrupoUseCase } from "./atualizarGrupoUseCase";
import { container } from "tsyringe";

class AtualizarGrupoController{
    async handle(request:Request,response:Response): Promise<Response>{
        const {nome} = request.body
        const{id} = request.params

        const atualizarGrupoUseCase = container.resolve(AtualizarGrupoUseCase)
        const grupoAtualizado = atualizarGrupoUseCase.execute({id:parseInt(id,10),nome})
        return response.send(grupoAtualizado).status(200)
    }
}

export {AtualizarGrupoController}