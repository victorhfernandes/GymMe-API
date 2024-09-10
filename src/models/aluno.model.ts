import { Aluno } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

type PostBody = {
  nm_instrutor: string;
  email_instrutor: string;
  senha_instrutor: string;
  cel_instrutor: string;
  cref_instrutor: string;
};

export const createAluno = async (body: Aluno) => {
  const createAlunoById = await prisma.aluno.create({
    data: body,
  });
  return createAlunoById;
};
