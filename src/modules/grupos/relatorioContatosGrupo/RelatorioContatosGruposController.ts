import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RelatorioContatosGruposUseCase } from "./RelatorioContatosGruposUseCase";

class RelatorioContatosGruposController {
  async handle(request: Request, response: Response): Promise<Response> {
      const relatorioContatosGruposUseCase = container.resolve(RelatorioContatosGruposUseCase);
      const relatorio = await relatorioContatosGruposUseCase.execute();
      return response.status(200).json(relatorio);

  }
}

export { RelatorioContatosGruposController };
