import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserAbilitieUseCase } from "./CreateUserAbilitieUseCase";
import Joi from "joi";

const userAbilitieSchema = Joi.object({
  abilityId: Joi.string().uuid().required().messages({
    "string.base": "The abilityId must be a string.",
    "string.empty": "The abilityId cannot be empty.",
    "string.uuid": "The abilityId must be a valid UUID.",
    "any.required": "The abilityId is required.",
  }),
  yearsExperience: Joi.number().integer().min(0).required().messages({
    "number.base": "The yearsExperience must be a number.",
    "number.min": "The yearsExperience cannot be less than 0.",
    "number.integer": "The yearsExperience must be an integer.",
    "any.required": "The yearsExperience is required.",
  }),
});

class CreateUserAbilitieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = userAbilitieSchema.validate(request.body, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const { abilityId, yearsExperience } = request.body;
    const { id: userId } = request.user;

    const createUserAbilitieUseCase = container.resolve(CreateUserAbilitieUseCase);

    await createUserAbilitieUseCase.execute({
      userId,
      abilityId,
      yearsExperience,
    });

    return response.status(201).send();
  }
}

export { CreateUserAbilitieController };
