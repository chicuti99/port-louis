import { Express, Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post("/users/login",authenticateUserController.handle);
//coloquei algumas regras arbitrarias para fins de demonstração tambem
export{authenticateRoutes}