import {Router} from 'express';
import { CreateContatoController } from '../modules/contatos/useCasses/createContato/CreateContatoController';
import multer from 'multer';
import { ListContatosController } from '../modules/contatos/useCasses/listarContato/ListCategoriesController';
import { AtualizarContatoController } from '../modules/contatos/useCasses/atualizarContato/atualizarContatoController';
import { DeletarContatoController } from '../modules/contatos/useCasses/deletarContato/deletarContatoController';


const contatosRoutes = Router();

const upload = multer({
    dest:"./tmp"
})



const createContatoController = new CreateContatoController();
contatosRoutes.post("/contatos",createContatoController.handle);

const listarContatosUseCase = new ListContatosController();   
contatosRoutes.get("/contatos",listarContatosUseCase.handle)

const atualizarContatoUseCase = new AtualizarContatoController();
contatosRoutes.patch("/contatos/:id",atualizarContatoUseCase.handle)

const deletarContatoUseCase = new DeletarContatoController()
contatosRoutes.delete("/contatos/:id",deletarContatoUseCase.handle)
export {contatosRoutes}