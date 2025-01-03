import { Request, Response } from "express";
import { ListUserAbilitiesUseCase } from "./ListUserAbilitiesUseCase";
import Joi from "joi";

const listUserAbilitiesSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.base": "The userId must be a string.",
    "string.empty": "The userId cannot be empty.",
    "string.uuid": "The userId must be a valid UUID.",
    "any.required": "The userId is required.",
  }),
  page: Joi.number().integer().min(1).max(3).optional().messages({
    "number.base": "The page must be a number.",
    "number.integer": "The page must be an integer.",
    "number.min": "The page must be at least 1.",
    "number.max": "The page cannot exceed 3.",
  }),
  limit: Joi.number().integer().min(1).max(30).optional().messages({
    "number.base": "The limit must be a number.",
    "number.integer": "The limit must be an integer.",
    "number.min": "The limit must be at least 1.",
    "number.max": "The limit cannot exceed 30.",
  }),
});

class ListUserAbilitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validationPayload = {
      userId: request.user.id,
      page: request.query.page ? Number(request.query.page) : undefined,
      limit: request.query.limit ? Number(request.query.limit) : undefined,
    };

    const { error } = listUserAbilitiesSchema.validate(validationPayload, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const { page = 1, limit = 10 } = request.query;
    const { id: userId } = request.user;

    const listUserAbilitiesUseCase = new ListUserAbilitiesUseCase();

    const result = await listUserAbilitiesUseCase.execute({
      userId,
      page: Number(page),
      limit: Number(limit),
    });

    return response.status(200).json(result);
  }
}

export { ListUserAbilitiesController };
