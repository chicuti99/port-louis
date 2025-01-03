import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import Joi from "joi";

const authenticateUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "The email must be a string.",
    "string.email": "The email must be a valid email address.",
    "string.empty": "The email cannot be empty.",
    "any.required": "The email is required.",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).{10,30}$/)
    .required()
    .messages({
      "string.base": "The password must be a string.",
      "string.empty": "The password cannot be empty.",
      "string.pattern.base": "The password must contain at least one letter, one number, and be between 10 and 30 characters long.",
      "any.required": "The password is required.",
    }),
});

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = authenticateUserSchema.validate(request.body, { abortEarly: false });
    if (error) {
      return response.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateInfo = await authenticateUserUseCase.execute({ email, password });

    return response.json(authenticateInfo);
  }
}

export { AuthenticateUserController };
