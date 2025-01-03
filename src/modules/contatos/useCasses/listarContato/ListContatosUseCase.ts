import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

interface IRequest {
  page: number;
  limit: number;
}

interface IContato {
  id: number;
  nome: string;
  telefone: string;
}

class ListContatosUseCase {
  async execute({ page, limit }: IRequest): Promise<IContato[]> {
    const prisma = new PrismaClient();

    const offset = (page - 1) * limit;

    const contatos = await prisma.contato.findMany({
      orderBy: {
        nome: "asc",
      },
      skip: offset,
      take: limit,
    });

    return contatos;
  }
}

export { ListContatosUseCase };
