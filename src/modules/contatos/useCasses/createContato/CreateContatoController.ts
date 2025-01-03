import "reflect-metadata";
import { Request, Response } from "express";
import { CreateContatoUseCase } from "./CreateContatoUseCase";
import { container } from "tsyringe";
import Joi from "joi";

const contatoSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "O nome deve ser uma string.",
      "string.empty": "O nome não pode ser vazio.",
      "string.min": "O nome deve ter no mínimo 3 caracteres.",
      "string.max": "O nome deve ter no máximo 50 caracteres.",
      "any.required": "O nome é obrigatório.",
    }),
  telefone: Joi.string()
    .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
    .required()
    .messages({
      "string.base": "O telefone deve ser uma string.",
      "string.empty": "O telefone não pode ser vazio.",
      "string.pattern.base": "O telefone deve estar no formato (xx) xxxxx-xxxx.",
      "any.required": "O telefone é obrigatório.",
    }),
});

class CreateContatoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = contatoSchema.validate(request.body, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Erro de validação",
        details: error.details.map((err) => err.message),
      });
    }

    const { nome, telefone } = request.body;
    const createContatoUseCase = container.resolve(CreateContatoUseCase);

    const contato = await createContatoUseCase.execute({ nome, telefone });
    return response.status(201).json(contato);
  }
}

export { CreateContatoController };