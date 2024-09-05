import { Instrutor } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

type PostBody = {
  nm_instrutor: string;
  email_instrutor: string;
  senha_instrutor: string;
  cel_instrutor: string;
  cref_instrutor: string;
};

export const findInstrutor = async () => {
  const instrutor = await prisma.instrutor.findMany();
  return instrutor;
};

export const findInstrutorById = async (id: number) => {
  const instrutor = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id,
    },
  });
  return instrutor;
};

export const createInstrutorById = async (body: PostBody) => {
  const createInstrutorById = await prisma.instrutor.create({
    data: body,
  });
  return createInstrutorById;
};
