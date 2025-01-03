import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "The name must be a string.",
    "string.empty": "The name cannot be empty.",
    "string.min": "The name must be at least 3 characters long.",
    "string.max": "The name must not exceed 50 characters.",
    "any.required": "The name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "The email must be a string.",
    "string.empty": "The email cannot be empty.",
    "string.email": "The email must be a valid email address.",
    "any.required": "The email is required.",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.base": "The password must be a string.",
    "string.empty": "The password cannot be empty.",
    "string.min": "The password must be at least 6 characters long.",
    "string.max": "The password must not exceed 20 characters.",
    "any.required": "The password is required.",
  }),
  birthdate: Joi.string()
    .isoDate()
    .required()
    .messages({
      "string.base": "The birthdate must be a string.",
      "string.empty": "The birthdate cannot be empty.",
      "string.isoDate": "The birthdate must be in ISO-8601 format.",
      "any.required": "The birthdate is required.",
    }),
});

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = userSchema.validate(request.body, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const { name, email, password, birthdate } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      birthdate,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
