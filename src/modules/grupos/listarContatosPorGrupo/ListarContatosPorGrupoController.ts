import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListarContatosPorGrupoUseCase } from "./ListarContatosPorGrupoUseCase";

class ListarContatosPorGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (isNaN(Number(id))) {
      return response.status(400).json({
        message: "O ID do grupo deve ser um número válido.",
      });
    }

      const listarContatosPorGrupoUseCase = container.resolve(ListarContatosPorGrupoUseCase);
      const contatos = await listarContatosPorGrupoUseCase.execute({ groupId: Number(id) });

      return response.status(200).json(contatos);
    
    
  }
}

export { ListarContatosPorGrupoController };
