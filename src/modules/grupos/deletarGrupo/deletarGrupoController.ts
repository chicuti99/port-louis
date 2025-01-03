import "reflect-metadata";
import { Request, Response } from "express";
import { DeletarGrupoUseCase } from "./deletarGrupoUseCase";
import { container } from "tsyringe";

class DeletarGrupoController {
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params
        const deletarGrupoUseCase = container.resolve(DeletarGrupoUseCase);
        await deletarGrupoUseCase.execute({id:parseInt(id,10)})
        return response.status(204).send()
    }
}

export {DeletarGrupoController}