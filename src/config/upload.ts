import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

export default {
    upload(folder: string): Options {
        return {
            storage: multer.diskStorage({
                destination: path.resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;
                    callback(null, fileName);
                },
            }),
            limits: {
                fileSize: 10 * 1024 * 1024, 
            },
            fileFilter: (
                request: Request,
                file: Express.Multer.File,
                callback: multer.FileFilterCallback
            ) => {
                const allowedMimes = ["application/pdf"];

                if (allowedMimes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new Error("Apenas arquivos PDF são permitidos!"));
                }
            },
        };
    },
};
