import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AdicionarContatoUseCase } from "./adicionarContatoUseCase";
import Joi from "joi";

const schema = Joi.object({
    telefone: Joi.string()
      .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
      .required()
      .messages({
        "string.base": "O telefone deve ser uma string.",
        "string.empty": "O telefone não pode estar vazio.",
        "string.pattern.base": "O telefone deve estar no formato (xx) xxxx-xxxx.",
        "any.required": "O telefone é obrigatório.",
      }),
    nome: Joi.string()
      .min(3)
      .required()
      .messages({
        "string.base": "O nome deve ser uma string.",
        "string.empty": "O nome não pode estar vazio.",
        "string.min": "O nome deve ter pelo menos 3 caracteres.",
        "any.required": "O nome é obrigatório.",
      }),
  });
class AdicionarContatoController {
  async handle(request: Request, response: Response): Promise<Response> {
    

    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Erro de validação",
        detalhes: error.details.map((err) => err.message),
      });
    }

    const { telefone, nome } = request.body;

      const adicionarContatoUseCase = container.resolve(AdicionarContatoUseCase);
      await adicionarContatoUseCase.execute({ telefone, nome });

      return response.status(201).json({ message: "Contato adicionado ao grupo com sucesso!" });
    
    
  }
}

export { AdicionarContatoController };
