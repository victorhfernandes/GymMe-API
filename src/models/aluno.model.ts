import { Aluno } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

export async function createAluno(body: Aluno) {
  const resultado = await prisma.aluno.create({
    data: body,
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

export async function findLoginAluno(body: Aluno) {
  const { email_aluno, senha_aluno } = body;
  const resultado = await prisma.aluno.findUnique({
    where: {
      email_aluno: email_aluno,
      senha_aluno: senha_aluno,
    },
    select: {
      id_aluno: true,
    },
  });
  return resultado;
}
