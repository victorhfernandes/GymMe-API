import { Aluno } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

export async function createAluno(body: Aluno) {
  const resultado = await prisma.aluno.create({
    data: body,
  });
  return resultado;
}

export async function findAlunoByEmail(email: string) {
  const resultado = await prisma.aluno.findUnique({
    where: {
      email_aluno: email,
    },
    select: {
      id_aluno: true,
    },
  });
  return resultado;
}
