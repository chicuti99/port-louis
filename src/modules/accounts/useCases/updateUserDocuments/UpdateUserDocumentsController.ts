import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserDocumentsUseCase } from "./UpdateUserDocumentsUseCase";
import Joi from "joi";

const documentSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.base": "The user_id must be a string.",
      "string.empty": "The user_id cannot be empty.",
      "string.uuid": "The user_id must be a valid UUID.",
      "any.required": "The user_id is required.",
    }),
  document_name: Joi.string()
    .pattern(/^[\w,\s-]+\.[A-Za-z]{3,4}$/)
    .required()
    .messages({
      "string.base": "The document_name must be a string.",
      "string.empty": "The document_name cannot be empty.",
      "string.pattern.base": "The document_name must have a valid file name format.",
      "any.required": "The document_name is required.",
    }),
  document_path: Joi.string()
    .pattern(/^\/documents\/[\w,\s-]+\.[A-Za-z]{3,4}$/)
    .required()
    .messages({
      "string.base": "The document_path must be a string.",
      "string.empty": "The document_path cannot be empty.",
      "string.pattern.base": "The document_path must start with /documents/ and contain a valid file name.",
      "any.required": "The document_path is required.",
    }),
});

class UpdateUserDocumentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const document_name = request.file?.filename || " ";
    const document_path = `/documents/${document_name}`;

    const { error } = documentSchema.validate(
      { user_id, document_name, document_path },
      { abortEarly: false }
    );

    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const updateUserDocumentsUseCase = container.resolve(UpdateUserDocumentsUseCase);

    await updateUserDocumentsUseCase.execute({
      user_id,
      document_name,
      document_path,
    });

    return response.status(201).json({ message: "Documento criado com sucesso!" });
  }
}

export { UpdateUserDocumentsController };
