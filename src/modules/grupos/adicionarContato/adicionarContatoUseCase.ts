import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  telefone: string; 
  nome: string;     
}

class AdicionarContatoUseCase {
  async execute({ telefone, nome }: IRequest): Promise<void> {
    const prisma = new PrismaClient();

    const contato = await prisma.contato.findUnique({
      where: { telefone },
    });

    if (!contato) {
      throw new AppError("Contato não encontrado", 404);
    }

    const grupo = await prisma.grupo.findUnique({
      where: { nome },
    });

    if (!grupo) {
      throw new AppError("Grupo não encontrado", 404);
    }

    const relacaoExistente = await prisma.contatosGrupos.findUnique({
      where: {
        id_contato_id_grupo: {
          id_contato: contato.id,
          id_grupo: grupo.id,
        },
      },
    });

    if (relacaoExistente) {
      throw new AppError("O contato já está associado a este grupo", 400);
    }

    await prisma.contatosGrupos.create({
      data: {
        id_contato: contato.id,
        id_grupo: grupo.id,
      },
    });
  }
}

export { AdicionarContatoUseCase };
