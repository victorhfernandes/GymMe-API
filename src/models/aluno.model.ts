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
  cpf_aluno: string,
  foto_perfil: string,
  atestado: string,
  doresPeito: boolean,
  desequilibrio: boolean,
  osseoArticular: boolean,
  medicado: boolean,
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
      cpf_aluno: cpf_aluno,
      foto_perfil: foto_perfil,
      atestado: atestado,
      doresPeito: doresPeito,
      desequilibrio: desequilibrio,
      osseoArticular: osseoArticular,
      medicado: medicado,
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
      foto_perfil: true,
      atestado: true,
      doresPeito: true,
      desequilibrio: true,
      osseoArticular: true,
      medicado: true,
    },
  });
  return resultado;
}

export async function findAnaliseAluno(id: number) {
  const resultado = await prisma.aluno.findUnique({
    where: {
      id_aluno: id,
    },
    select: {
      nm_aluno: true,
      foto_perfil: true,
      atestado: true,
      nascimento_aluno: true,
      doresPeito: true,
      desequilibrio: true,
      osseoArticular: true,
      medicado: true,
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

export async function createServico(instrutor: number, aluno: number) {
  const resultado = await prisma.servico.create({
    data: {
      id_instrutor: instrutor,
      id_aluno: aluno,
    },
  });
  return resultado;
}

export async function findServicosAlunoByStatus(
  id: number,
  statusServico: boolean | null,
  statusPagamento: boolean | null
) {
  const resultado = await prisma.servico.findMany({
    where: {
      id_aluno: id,
      status_servico: statusServico,
      status_pagamento: statusPagamento,
    },
    include: {
      tb_instrutor: {
        select: {
          id_instrutor: true,
          foto_perfil: true,
          nm_instrutor: true,
          especializacoes: {
            include: {
              especializacao: {
                select: {
                  nm_especializacao: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  const formattedResult = resultado.map((servico) => {
    const instrutor = servico.tb_instrutor;
    const especializacoes = instrutor.especializacoes
      .map((especializacao) => especializacao.especializacao.nm_especializacao)
      .sort();

    return {
      id_instrutor: instrutor.id_instrutor,
      foto_perfil: instrutor.foto_perfil,
      nm_instrutor: instrutor.nm_instrutor,
      especializacoes: especializacoes,
      status_servico: servico.status_servico,
      status_pagamento: servico.status_pagamento,
      updated_at: servico.updated_at,
    };
  });

  return formattedResult;
}

export async function updateServicoStatusPagamento(
  idInstrutor: number,
  idAluno: number,
  statusPagamento: boolean | null
) {
  const resultado = await prisma.servico.updateMany({
    where: {
      id_instrutor: idInstrutor,
      id_aluno: idAluno,
    },
    data: {
      status_pagamento: statusPagamento,
    },
  });
  return resultado.count === 1;
}
