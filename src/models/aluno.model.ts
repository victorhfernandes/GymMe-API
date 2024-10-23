import { Aluno } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

export async function createAluno(email_aluno: string, senha_aluno: string) {
  const resultado = await prisma.aluno.create({
    data: {
      email_aluno: email_aluno,
      senha_aluno: senha_aluno,
    },
  });
  return resultado;
}

export async function findAluno(id_aluno: number) {
  const resultado = await prisma.aluno.findUnique({
    where: {
      id_aluno: id_aluno,
    },
    select: {
      nm_aluno: true,
      celular_aluno: true,
      nascimento_aluno: true,
    },
  });
  return resultado;
}

export async function findLoginAluno(email_aluno: string) {
  const resultado = await prisma.aluno.findUnique({
    where: {
      email_aluno: email_aluno,
    },
    select: {
      id_aluno: true,
      senha_aluno: true,
    },
  });
  return resultado;
}
