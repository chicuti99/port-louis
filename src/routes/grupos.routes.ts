import {Router} from 'express';
import { CriarGrupoController } from '../modules/grupos/criarGrupo/criarGruposController';
import { AtualizarGrupoController } from '../modules/grupos/atualizarGrupo/atualizarGrupoController';
import { DeletarGrupoController } from '../modules/grupos/deletarGrupo/deletarGrupoController';
import { AdicionarContatoController } from '../modules/grupos/adicionarContato/adicionarContatoController';
import { ListarContatosPorGrupoController } from '../modules/grupos/listarContatosPorGrupo/ListarContatosPorGrupoController';
import { RelatorioContatosGruposController } from '../modules/grupos/relatorioContatosGrupo/RelatorioContatosGruposController';

const grupoRouter = Router();



const criarGruposController = new CriarGrupoController();
grupoRouter.post("/grupo",criarGruposController.handle);

const atualizarGrupoController = new AtualizarGrupoController();
grupoRouter.patch("/grupo/:id",atualizarGrupoController.handle);

const deletarGrupoController = new DeletarGrupoController()
grupoRouter.delete("/grupo/:id",deletarGrupoController.handle)

const adicionarContatoController = new AdicionarContatoController();
grupoRouter.post("/grupo/adicionar",adicionarContatoController.handle);

const listarContatosPorGrupoController = new ListarContatosPorGrupoController();
grupoRouter.get("/grupo/:id/contatos",listarContatosPorGrupoController.handle)

const relatorioContatosGruposController = new RelatorioContatosGruposController();
grupoRouter.get("/relatorio/contatos-grupos",relatorioContatosGruposController.handle)
export {grupoRouter}