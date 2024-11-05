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

export async function createAlunoCompleto(
  nm_aluno: string,
  celular_aluno: string,
  nascimento_aluno: Date,
  id: number
) {
  const resultado = await prisma.aluno.update({
    where: {
      id_aluno: id,
    },
    data: {
      nm_aluno: nm_aluno,
      celular_aluno: celular_aluno,
      nascimento_aluno: nascimento_aluno,
    },
  });
  return resultado;
}

export async function findAlunoById(id_aluno: number) {
  const resultado = await prisma.aluno.findUnique({
    where: {
      id_aluno: id_aluno,
    },
    select: {
      nm_aluno: true,
      celular_aluno: true,
      nascimento_aluno: true,
      cpf_aluno: true,
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
