import "reflect-metadata";
import { Request, Response } from "express";
import { DeletarGrupoUseCase } from "./deletarGrupoUseCase";
import { container } from "tsyringe";

class DeletarGrupoController {
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params
        const deletarGrupoUseCase = container.resolve(DeletarGrupoUseCase);
        await deletarGrupoUseCase.execute({id:parseInt(id,10)})
        return response.send().status(204)
    }
}

export {DeletarGrupoController}