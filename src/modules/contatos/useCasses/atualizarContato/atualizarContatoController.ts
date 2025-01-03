import "reflect-metadata";
import { Request, Response } from "express";
import { AtualizarContatoUseCase } from "./atualizarContatoUseCase";
import { container } from "tsyringe";
import Joi from "joi";
import { AppError } from "../../../../errors/AppError";

const updateContatoSchema = Joi.object({
    nome: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.base": "O nome deve ser uma string.",
        "string.empty": "O nome não pode estar vazio.",
        "string.min": "O nome deve ter no mínimo 3 caracteres.",
        "string.max": "O nome deve ter no máximo 50 caracteres.",
        "any.required": "O nome é obrigatório.",
      }),
    telefone: Joi.string()
      .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
      .required()
      .messages({
        "string.pattern.base": "O telefone deve estar no formato (xx) xxxxx-xxxx.",
        "any.required": "O telefone é obrigatório.",
      }),
  });

class AtualizarContatoController {
    async handle(request:Request,response:Response):Promise<Response>{
        
        const { id } = request.params;
        const { nome, telefone } = request.body;
        const { error } = updateContatoSchema.validate({ nome, telefone }, { abortEarly: false });
        if (error) {
        return response.status(400).json({
            message: "Erro de validação",
            details: error.details.map((err) => err.message),
        });
        }

        const atualizarContatoUseCase = container.resolve(AtualizarContatoUseCase)
        
        const contato = await atualizarContatoUseCase.execute({id:parseInt(id,10),nome,telefone})
        return response.send(contato).status(201)
    }
}

export {AtualizarContatoController}