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

export async function findAlunoByEmail(body: Aluno) {
  const { email_aluno } = body;
  const resultado = await prisma.aluno.findUnique({
    where: {
      email_aluno: email_aluno,
    },
    select: {
      id_aluno: true,
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
