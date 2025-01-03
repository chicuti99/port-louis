// import "reflect-metadata";
// import { Request, Response } from "express";
// import { ListarContatosUseCase } from "./ListContatosUseCase";
// import { container } from "tsyringe";
// import Joi from "joi";
// import { AppError } from "../../../../errors/AppError";

// const updateAbilitiesSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(50)
//     .required()
//     .messages({
//       "string.base": "The name must be a string.",
//       "string.empty": "The name cannot be empty.",
//       "string.min": "The name must have at least 3 characters.",
//       "string.max": "The name must have at most 50 characters.",
//       "any.required": "The name is required.",
//     }),
//   active: Joi.boolean()
//     .required()
//     .messages({
//       "boolean.base": "The active field must be a boolean.",
//       "any.required": "The active field is required.",
//     }),
// });

// class ListarContatosController {
//   async handle(request: Request, response: Response): Promise<Response> {
//     // const { error } = updateAbilitiesSchema.validate(request.body, { abortEarly: false });
//     // if (error) {
//     //   return response.status(400).json({
//     //     message: "Validation error",
//     //     details: error.details.map((err) => err.message),
//     //   });
//     // }

//     const { page = 1, limit = 10 } = request.query;

//     const parsedPage = parseInt(page as string, 10);
//     const parsedLimit = parseInt(limit as string, 10);

//     if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
//       throw new AppError("Os parâmetros 'page' e 'limit' devem ser números inteiros maiores que zero.",400)
//     }
//     const listarContatosUseCase = container.resolve(ListarContatosUseCase);
//     const listarContatos = await listarContatosUseCase.execute({ 
//       page:parsedPage, 
//       limit: parsedLimit 
//     });

//     return response.status(200).json({
//       message: "contatos recuperados com sucesso",
//       data: listarContatos,
//     });
//   }
// }

// export { ListarContatosController };




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
