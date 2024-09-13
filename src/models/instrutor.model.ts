import { Instrutor } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

// mover isso para outra pasta
// pesquisar sobre [Symbol.iterator]() para não utilizar type any
const organize = (body: any) => {
  const newJson = [];
  let idInstrutor = 0;
  let count = 0;

  for (let item of body) {
    const objInstrutor = {
      id_instrutor: item.id_instrutor,
      nm_instrutor: item.instrutor.nm_instrutor,
      especializacao: [
        {
          id: item.id_especializacao,
          name: item.especializacao.nm_especializacao,
        },
      ],
    };

    if (item.id_instrutor === idInstrutor) {
      newJson[count - 1].especializacao.push(objInstrutor.especializacao[0]);
    } else {
      newJson.push(objInstrutor);
      count++;
    }

    idInstrutor = item.id_instrutor;
  }
  return newJson;
};
//

export async function findInstrutor() {
  const instrutor = await prisma.instrutorEspecializacao.findMany({
    include: {
      instrutor: {
        select: {
          nm_instrutor: true,
        },
      },
      especializacao: {
        select: {
          nm_especializacao: true,
        },
      },
    },
    orderBy: {
      instrutor: {
        nm_instrutor: "asc",
      },
    },
  });
  return organize(instrutor);
}

export async function findInstrutorById(id: number) {
  const instrutor = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id,
    },
  });
  return instrutor;
}

export async function createInstrutor(body: Instrutor) {
  const createInstrutorById = await prisma.instrutor.create({
    data: body,
  });
  return createInstrutorById;
}
