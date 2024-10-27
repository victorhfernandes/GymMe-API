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
export async function findInstrutores() {
  const resultado = await prisma.$queryRaw`SELECT
    i.nm_instrutor AS nome, i.foto_perfil AS foto,
    GROUP_CONCAT(e.nm_especializacao ORDER BY e.nm_especializacao SEPARATOR '; ') AS especializacoes
    FROM tb_instrutorEspecializacao ie
    JOIN tb_instrutor i ON ie.id_instrutor = i.id_instrutor
    JOIN tb_especializacao e ON ie.id_especializacao = e.id_especializacao
    GROUP BY i.id_instrutor
    ORDER BY i.id_instrutor;`;

  return resultado;
}

export async function findInstrutorById(id_instrutor: number) {
  const resultado = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id_instrutor,
    },
    select: {
      nm_instrutor: true,
      cel_instrutor: true,
      nascimento_instrutor: true,
    },
  });
  return resultado;
}

//Implementar OR no WHERE
export async function findInstrutoresByEspecializacao(especializacao: number) {
  const resultado = await prisma.$queryRaw`SELECT i.nm_instrutor AS nome, 
  GROUP_CONCAT(e.nm_especializacao ORDER BY e.nm_especializacao SEPARATOR '; ') AS especializacoes
  FROM tb_instrutorEspecializacao ie
  JOIN tb_instrutor i ON ie.id_instrutor = i.id_instrutor
  JOIN tb_especializacao e ON ie.id_especializacao = e.id_especializacao
  WHERE e.id_especializacao = ${especializacao} 
  GROUP BY i.id_instrutor
  ORDER BY i.id_instrutor;`;

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
