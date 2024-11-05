import { Especializacao, Instrutor } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

//Create
export async function createInstrutor(
  email_instrutor: string,
  senha_instrutor: string
) {
  const resultado = await prisma.instrutor.create({
    data: {
      email_instrutor: email_instrutor,
      senha_instrutor: senha_instrutor,
    },
  });
  return resultado;
}

export async function createInstrutorCompleto(
  nm_instrutor: string,
  cel_instrutor: string,
  nascimento_instrutor: Date,
  especializacoes: [],
  foto_perfil: string,
  id: number
) {
  const resultado = await prisma.instrutor.update({
    where: {
      id_instrutor: id,
    },
    data: {
      nm_instrutor: nm_instrutor,
      cel_instrutor: cel_instrutor,
      nascimento_instrutor: nascimento_instrutor,
      foto_perfil: foto_perfil,
    },
  });
  especializacoes.map(async (item: Especializacao) => {
    const resultado2 = await prisma.instrutorEspecializacao.create({
      data: {
        id_instrutor: id,
        id_especializacao: item.id_especializacao,
      },
    });
  });
  return resultado.id_instrutor === id;
}

//Read
export async function findInstrutores(id_especializacao: number[]) {
  let instrutores;
  if (id_especializacao[0]) {
    instrutores = await prisma.instrutor.findMany({
      where: {
        especializacoes: {
          some: {
            especializacao: {
              id_especializacao: {
                in: id_especializacao,
              },
            },
          },
        },
      },
      select: {
        nm_instrutor: true,
        foto_perfil: true,
        especializacoes: {
          select: {
            especializacao: {
              select: {
                nm_especializacao: true,
              },
            },
          },
        },
      },
      orderBy: {
        id_instrutor: "asc",
      },
    });
  } else {
    instrutores = await prisma.instrutor.findMany({
      select: {
        nm_instrutor: true,
        foto_perfil: true,
        especializacoes: {
          select: {
            especializacao: {
              select: {
                nm_especializacao: true,
              },
            },
          },
        },
      },
      orderBy: {
        id_instrutor: "asc",
      },
    });
  }

  const notNullInstrutores = instrutores.filter((item) => item.nm_instrutor);

  const resultado = notNullInstrutores.map((instrutor) => ({
    nome: instrutor.nm_instrutor,
    foto: instrutor.foto_perfil,
    especializacoes: instrutor.especializacoes
      .map((e) => e.especializacao.nm_especializacao)
      .sort()
      .join("; "),
  }));

  return resultado;
}

export async function findInstrutorById(id_instrutor: number) {
  const resultado = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id_instrutor,
    },
    select: {
      nm_instrutor: true,
      email_instrutor: true,
      cel_instrutor: true,
      cref_instrutor: true,
      nascimento_instrutor: true,
      foto_perfil: true,
      cpf_instrutor: true,
    },
  });
  return resultado;
}

export async function findLoginInstrutor(email_instrutor: string) {
  const resultado = await prisma.instrutor.findUnique({
    where: {
      email_instrutor: email_instrutor,
    },
    select: {
      id_instrutor: true,
      senha_instrutor: true,
    },
  });
  return resultado;
}

export async function findEspecializacoes() {
  const resultado = await prisma.especializacao.findMany();
  return resultado;
}

export async function findInstrutorByEmail(body: Instrutor) {
  const { email_instrutor } = body;
  const resultado = await prisma.instrutor.findUnique({
    where: {
      email_instrutor: email_instrutor,
    },
    select: {
      id_instrutor: true,
    },
  });
  return resultado;
}
