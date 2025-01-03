import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

interface IRelatorio {
  grupo: string;
  quantidade_contatos: number;
}

class RelatorioContatosGruposUseCase {
  async execute(): Promise<IRelatorio[]> {
    const prisma = new PrismaClient();

    const relatorio = await prisma.grupo.findMany({
      select: {
        nome: true,
        _count: {
          select: {
            contatosGrupos: true,
          },
        },
      },
      orderBy: {
        contatosGrupos: {
          _count: "desc",
        },
      },
    });

    return relatorio.map((grupo) => ({
      grupo: grupo.nome,
      quantidade_contatos: grupo._count.contatosGrupos,
    }));
  }
}

export { RelatorioContatosGruposUseCase };
