import {
  Certificacao,
  Cidade,
  Especializacao,
  Experiencia,
  Instrutor,
  Treino,
} from "@prisma/client";
import { prisma } from "../utils/prisma.util";

type Planilha = {
  id_planilha: number;
  nm_planilha: string;
  id_servico: number;
  treinos: Treino[];
};

type Select = {
  value: number;
  label: string;
};

type Accumulator = Planilha[];

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
  celular_instrutor: string,
  nascimento_instrutor: Date,
  especializacoes: [],
  certificacoes: [],
  experiencias: [],
  cidades: [],
  foto_perfil: string,
  cpf_instrutor: string,
  id: number
) {
  const resultado = await prisma.instrutor.update({
    where: {
      id_instrutor: id,
    },
    data: {
      nm_instrutor: nm_instrutor,
      celular_instrutor: celular_instrutor,
      nascimento_instrutor: nascimento_instrutor,
      foto_perfil: foto_perfil,
      cpf_instrutor: cpf_instrutor,
    },
  });
  especializacoes.map(async (item: Select) => {
    const resultado = await prisma.instrutorEspecializacao.create({
      data: {
        id_instrutor: id,
        id_especializacao: item.value,
      },
    });
  });
  certificacoes.map(async (item: Select) => {
    const resultado = await prisma.instrutorCertificacao.create({
      data: {
        id_instrutor: id,
        id_certificacao: item.value,
      },
    });
  });
  experiencias.map(async (item: Select) => {
    const resultado = await prisma.instrutorExperiencia.create({
      data: {
        id_instrutor: id,
        id_experiencia: item.value,
      },
    });
  });
  cidades.map(async (item: Select) => {
    const resultado = await prisma.instrutorCidade.create({
      data: {
        id_instrutor: id,
        id_cidade: item.value,
      },
    });
  });
  return resultado.id_instrutor === id;
}

//Read
export async function findInstrutores(id_especializacao: number[]) {
  let instrutores;
  if (id_especializacao[0]) {
    instrutores = await prisma.instrutor.findMany({
      where: {
        especializacoes: {
          some: {
            especializacao: {
              id_especializacao: {
                in: id_especializacao,
              },
            },
          },
        },
      },
      select: {
        id_instrutor: true,
        nm_instrutor: true,
        foto_perfil: true,
        intro_instrutor: true,
        especializacoes: {
          select: {
            especializacao: {
              select: {
                nm_especializacao: true,
              },
            },
          },
        },
      },
      orderBy: {
        id_instrutor: "asc",
      },
    });
  } else {
    instrutores = await prisma.instrutor.findMany({
      select: {
        id_instrutor: true,
        nm_instrutor: true,
        foto_perfil: true,
        intro_instrutor: true,
        especializacoes: {
          select: {
            especializacao: {
              select: {
                nm_especializacao: true,
              },
            },
          },
        },
      },
      orderBy: {
        id_instrutor: "asc",
      },
    });
  }

  const notNullInstrutores = instrutores.filter((item) => item.nm_instrutor);

  const resultado = notNullInstrutores.map((instrutor) => ({
    id: instrutor.id_instrutor,
    nome: instrutor.nm_instrutor,
    foto: instrutor.foto_perfil,
    introducao: instrutor.intro_instrutor,
    especializacoes: instrutor.especializacoes
      .map((e) => e.especializacao.nm_especializacao)
      .sort()
      .join("; "),
  }));

  return resultado;
}

export async function findInstrutorById(id_instrutor: number) {
  const resultado = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id_instrutor,
    },
    select: {
      id_instrutor: true,
      nm_instrutor: true,
      email_instrutor: true,
      celular_instrutor: true,
      cref_instrutor: true,
      nascimento_instrutor: true,
      foto_perfil: true,
      cpf_instrutor: true,
    },
  });
  return resultado;
}

export async function findInstrutorByIdCompleto(id_instrutor: number) {
  const instructorDetails = await prisma.instrutor.findUnique({
    where: {
      id_instrutor: id_instrutor,
    },
    include: {
      tb_instrutorcertificacao: {
        include: {
          tb_certificacao: true,
        },
      },
      tb_instrutorexperiencia: {
        include: {
          tb_experiencia: true,
        },
      },
      especializacoes: {
        include: {
          especializacao: true,
        },
      },
      tb_link: {
        include: {
          tb_tipo: true,
        },
      },
      tb_instrutorcidade: {
        include: {
          tb_cidade: true,
        },
      },
    },
  });

  if (!instructorDetails) {
    throw new Error("Instrutor não encontrado!");
  }

  const especializacoes = [
    ...new Set(
      instructorDetails.especializacoes.map(
        (especializacao) => especializacao.especializacao.nm_especializacao
      )
    ),
  ];
  const certificacoes = [
    ...new Set(
      instructorDetails.tb_instrutorcertificacao.map(
        (certificacao) => certificacao.tb_certificacao.nm_certificacao
      )
    ),
  ];
  const experiencias = [
    ...new Set(
      instructorDetails.tb_instrutorexperiencia.map(
        (experiencia) => experiencia.tb_experiencia.nm_experiencia
      )
    ),
  ];
  const links = [
    ...new Set(
      instructorDetails.tb_link.map(
        (link) => `${link.tb_tipo.nm_tipo}, ${link.nm_link}`
      )
    ),
  ];
  const cidades = [
    ...new Set(
      instructorDetails.tb_instrutorcidade.map(
        (cidade) => cidade.tb_cidade.nm_cidade
      )
    ),
  ];

  const notaMedia = await prisma.servico.aggregate({
    _avg: {
      nota: true,
    },
    where: {
      id_instrutor: id_instrutor,
    },
  });

  return {
    id_instrutor: instructorDetails.id_instrutor,
    created_at: instructorDetails.created_at,
    intro_instrutor: instructorDetails.intro_instrutor,
    nm_instrutor: instructorDetails.nm_instrutor,
    email_instrutor: instructorDetails.email_instrutor,
    celular_instrutor: instructorDetails.celular_instrutor,
    cref_instrutor: instructorDetails.cref_instrutor,
    cpf_instrutor: instructorDetails.cpf_instrutor,
    foto_perfil: instructorDetails.foto_perfil,
    notaMedia: notaMedia._avg.nota,
    especializacoes,
    certificacoes,
    experiencias,
    links,
    cidades,
  };
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

export async function findServicosInstrutorByStatus(
  id: number,
  status: boolean | null
) {
  const resultado = await prisma.servico.findMany({
    where: {
      id_instrutor: id,
      status_servico: status,
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      tb_aluno: {
        select: {
          id_aluno: true,
          foto_perfil: true,
          nm_aluno: true,
        },
      },
      status_pagamento: true,
      id_servico: true,
    },
  });

  const formattedResult = resultado.map((item) => {
    const aluno = item.tb_aluno;

    return {
      id_aluno: aluno.id_aluno,
      foto_perfil: aluno.foto_perfil,
      nm_aluno: aluno.nm_aluno,
      status_pagamento: item.status_pagamento,
      id_servico: item.id_servico,
    };
  });

  return formattedResult;
}

export async function updateServicoStatus(
  idInstrutor: number,
  idAluno: number,
  statusServico: boolean,
  statusPagamento: boolean | null
) {
  const resultado = await prisma.servico.updateMany({
    where: {
      id_instrutor: idInstrutor,
      id_aluno: idAluno,
    },
    data: {
      status_servico: statusServico,
      status_pagamento: statusPagamento,
    },
  });
  return resultado.count === 1;
}

export async function findPlanilhas(idInstrutor: number, idAluno: number) {
  const resultado = await prisma.planilha.findMany({
    where: {
      tb_servico: {
        id_aluno: idAluno,
        id_instrutor: idInstrutor,
      },
    },
    include: {
      tb_treino: {
        include: {
          tb_grupomuscular: true,
        },
      },
    },
  });

  // Transform the result to match the structure of your SQL query
  if (resultado) {
    const organizados = resultado.reduce<Accumulator>((accumulator, item) => {
      if (item.id_planilha && item.nm_planilha && accumulator) {
        if (!accumulator[item.id_planilha - 1]) {
          accumulator[item.id_planilha - 1] = {
            id_planilha: item.id_planilha,
            nm_planilha: item.nm_planilha,
            id_servico: item.id_servico,
            treinos: [],
          };
        }
        item.tb_treino.map((item2) => {
          const treino = {
            id_treino: item2.id_treino,
            nm_exercicio: item2.nm_exercicio,
            id_grupoMuscular: item2.id_grupoMuscular,
            id_planilha: item2.id_planilha,
            nm_grupoMuscular: item2.tb_grupomuscular?.nm_grupoMuscular,
            ds_treino: item2.ds_treino,
            qt_treino: item2.qt_treino,
            qt_serie: item2.qt_serie,
            kg_carga: item2.kg_carga,
            sg_descanso: item2.sg_descanso,
            gif_exercicio: item2.gif_exercicio,
          };

          accumulator[item.id_planilha - 1].treinos.push(treino);
        });
      }
      return accumulator;
    }, []);

    const filteredData = organizados.filter((item) => item !== null);

    return filteredData;
  }
}

export async function createPlanilha(nm_planilha: string, id_servico: number) {
  const resultado = await prisma.planilha.create({
    data: {
      nm_planilha: nm_planilha,
      id_servico: id_servico,
    },
  });

  return resultado;
}

export async function createTreino(
  nm_exercicio: string,
  id_grupoMuscular: number,
  id_planilha: number,
  qt_treino: number,
  qt_serie: number,
  kg_carga: number,
  ds_treino: string,
  gif_exercicio: string
) {
  const resultado = await prisma.treino.create({
    data: {
      nm_exercicio: nm_exercicio,
      id_grupoMuscular: id_grupoMuscular,
      id_planilha: id_planilha,
      qt_treino: qt_treino,
      qt_serie: qt_serie,
      kg_carga: kg_carga,
      ds_treino: ds_treino,
      gif_exercicio: gif_exercicio,
    },
  });

  return resultado;
}

export async function findEspecializacoes() {
  const resultado = await prisma.especializacao.findMany();
  return resultado;
}

export async function findGrupoMuscular() {
  const resultado = await prisma.grupoMuscular.findMany();
  return resultado;
}

export async function findCertificacao() {
  const resultado = await prisma.certificacao.findMany();
  return resultado;
}

export async function findCidade() {
  const resultado = await prisma.cidade.findMany();
  return resultado;
}

export async function findExperiencia() {
  const resultado = await prisma.experiencia.findMany();
  return resultado;
}

export async function eraseTreino(id_treino: number) {
  const resultado = await prisma.treino.delete({
    where: {
      id_treino: id_treino,
    },
  });

  return resultado;
}

export async function erasePlanilha(id_planilha: number) {
  const resultado = await prisma.planilha.delete({
    where: {
      id_planilha: id_planilha,
    },
  });

  return resultado;
}
