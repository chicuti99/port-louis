import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  groupId: number;
}

class ListarContatosPorGrupoUseCase {
  async execute({ groupId }: IRequest): Promise<{ id: number; nome: string; telefone: string }[]> {
    const prisma = new PrismaClient();

    const grupo = await prisma.grupo.findUnique({
      where: { id: groupId },
    });

    if (!grupo) {
      throw new AppError("Grupo não encontrado", 404);
    }

    const contatos = await prisma.contatosGrupos.findMany({
      where: { id_grupo: groupId },
      include: {
        contato: true,
      },
    });

    return contatos.map((entry) => ({
      id: entry.contato.id,
      nome: entry.contato.nome,
      telefone: entry.contato.telefone,
    }));
  }
}

export { ListarContatosPorGrupoUseCase };
