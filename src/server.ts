import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../src/swagger.json";

import { AppError } from "./errors/AppError";
import path from "path";

const app = express();

const documentsPath = path.resolve(__dirname, "..", "tmp", "documents");
app.use("/documents", express.static(documentsPath)); 

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "Error",
        message: `Internal server error - ${err.message}`,
    });
});
app.listen(3333, () => console.log("Server is running on port 3333"));
