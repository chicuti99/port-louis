import "reflect-metadata";
import { Request, Response } from "express";
import { DeletarContatoUseCase } from "./deletarContatoUseCase";
import { container } from "tsyringe";

class DeletarContatoController {
    async handle(request:Request,response:Response): Promise<Response>{
        const { id } = request.params;
        
        const deletarContatoUseCase = container.resolve(DeletarContatoUseCase);
        await deletarContatoUseCase.execute({id:parseInt(id,10)})
        return response.send().status(204);
    }
}

export {DeletarContatoController}