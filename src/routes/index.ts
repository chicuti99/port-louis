import { Router } from "express";
import { contatosRoutes } from "./contatos.routes";
import { grupoRouter } from "./grupos.routes";

const router = Router();


router.use("/",contatosRoutes);

router.use("/",grupoRouter)


export {router}