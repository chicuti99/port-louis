import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListContatosUseCase } from "./ListContatosUseCase";

class ListContatosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 10 } = request.query;

    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
      return response.status(400).json({
        message: "Os parâmetros 'page' e 'limit' devem ser números inteiros maiores que zero.",
      });
    }

    const listContatosUseCase = container.resolve(ListContatosUseCase);

    const contatos = await listContatosUseCase.execute({
      page: parsedPage,
      limit: parsedLimit,
    });

    return response.status(200).json(contatos);
  }
}

export { ListContatosController };
