import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createInstrutor,
  createInstrutorCompleto,
  findInstrutores,
  findInstrutorById,
  findInstrutorByIdCompleto,
  findInstrutorByIdCompletoForm,
  findLoginInstrutor,
  findEspecializacoes,
  findInstrutorByEmail,
  findServicosInstrutorByStatus,
  updateServicoStatus,
  findPlanilhas,
  createPlanilha,
  findGrupoMuscular,
  createTreino,
  eraseTreino,
  erasePlanilha,
  findCertificacao,
  findCidade,
  findExperiencia,
} from "../models/instrutor.model";
import { Decimal } from "@prisma/client/runtime/library";

type queryEspecializacao = {
  esp: number;
};

type InstrutorForms =
  | {
      nm_instrutor: string | null;
      celular_instrutor: string | null;
      nascimento_instrutor: Date | null;
      cpf_instrutor: string | null;
    }
  | {
      id_instrutor: number | null;
      created_at: Date | null;
      intro_instrutor: string | null;
      nm_instrutor: string | null;
      email_instrutor: string | null;
      celular_instrutor: string | null;
      cref_instrutor: string | null;
      foto_perfil: string | null;
      notaMedia: Decimal | null;
      especializacoes: (string | null)[];
      certificacoes: (string | null)[];
      experiencias: (string | null)[];
      links: (string | null)[];
      cidades: (string | null)[];
    }
  | {
      id_instrutor: number | null;
      created_at: Date | null;
      intro_instrutor: string | null;
      nm_instrutor: string | null;
      nascimento_instrutor: Date | null;
      email_instrutor: string | null;
      celular_instrutor: string | null;
      cref_instrutor: string | null;
      cpf_instrutor: string | null;
      foto_perfil: string | null;
      notaMedia: Decimal | null;
      especializacoes: Array<{
        value: number;
        label: string | null;
      }> | null;
      certificacoes: Array<{
        value: number;
        label: string | null;
      }> | null;
      experiencias: Array<{
        value: number;
        label: string | null;
      }> | null;
      links: string[] | null;
      cidades: Array<{
        value: number;
        label: string | null;
      }> | null;
    }
  | null;

type Select = {
  value: number;
  label: string;
};

export async function postInstrutor(request: Request, response: Response) {
  const { email_instrutor, senha_instrutor } = request.body;
  const hash = await bcrypt.hash(senha_instrutor, 13);
  const resultado = await createInstrutor(email_instrutor, hash);
  return response.status(201).json(resultado);
}

export async function postInstrutorCompleto(
  request: Request,
  response: Response
) {
  const {
    nm_instrutor,
    celular_instrutor,
    nascimento_instrutor,
    foto_perfil,
    cpf_instrutor,
    especializacoes,
    certificacoes,
    experiencias,
    cidades,
  } = request.body;

  const dtNascimento = new Date(nascimento_instrutor);
  const id = Number(request.params.id);
  const resultado = await createInstrutorCompleto(
    nm_instrutor,
    celular_instrutor,
    dtNascimento,
    especializacoes,
    certificacoes,
    experiencias,
    cidades,
    foto_perfil,
    cpf_instrutor,
    id
  );
  return response.json(resultado);
}

export async function postLoginInstrutor(request: Request, response: Response) {
  response.sendStatus(200);
}

export async function postLogOutInstrutor(
  request: Request,
  response: Response
) {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.sendStatus(200);
  });
}

export async function getInstrutorId(request: Request, response: Response) {
  return request.user
    ? response.status(200).json(request.user)
    : response.sendStatus(401).json();
}

/*Faz pesquisa de instrutores por Id de Especialização caso seja definido na url (?esp=),
caso não retorna todos os instrutores*/
export async function getInstrutores(
  request: Request<{}, {}, {}, queryEspecializacao>,
  response: Response
) {
  const arrayEsp = Array.isArray(request.query.esp)
    ? request.query.esp.map(Number)
    : [Number(request.query.esp)];
  const resultado = await findInstrutores(arrayEsp);

  return response.json(resultado);
}

export async function getInstrutorById(request: Request, response: Response) {
  const id_instrutor = request.params.id;
  const compl = request.query.compl;
  const resultado = !compl
    ? await findInstrutorById(Number(id_instrutor))
    : compl === "true"
    ? await findInstrutorByIdCompleto(Number(id_instrutor))
    : await findInstrutorByIdCompletoForm(Number(id_instrutor));
  if (request.query.isCadCompl) {
    const isCadCompl = !areAllValuesNull(resultado);
    return response.json(isCadCompl);
  }
  return response.json(resultado);
}

export async function getLoginInstrutor(request: Request, response: Response) {
  const { email_instrutor, senha_instrutor } = request.body;
  const resultado = await findLoginInstrutor(email_instrutor);
  if (resultado) {
    const isValid = await bcrypt.compare(
      senha_instrutor,
      resultado.senha_instrutor
    );
    if (isValid) {
      return response.json({
        id_instrutor: resultado.id_instrutor,
      });
    } else {
      return response.status(400).json(null);
    }
  } else {
    return response.status(400).json(resultado);
  }
}

export async function getInstrutorByEmail(
  request: Request,
  response: Response
) {
  const resultado = await findInstrutorByEmail(request.body);
  return response.json(!!resultado); //retorna resultado convertido em boolean
}

export async function getServicosInstrutorByStatus(
  request: Request,
  response: Response
) {
  const id = Number(request.params.id);
  const status =
    request.params.status === "true"
      ? true
      : request.params.status === "false"
      ? false
      : null;

  const resultado = await findServicosInstrutorByStatus(id, status);
  return response.json(resultado);
}

export async function putServicoStatus(request: Request, response: Response) {
  const idInstrutor = Number(request.params.idInstrutor);
  const idAluno = Number(request.params.idAluno);
  const { statusServico } = request.body;
  const statusPagamento = statusServico ? false : null;

  const resultado = await updateServicoStatus(
    idInstrutor,
    idAluno,
    statusServico,
    statusPagamento
  );
  if (resultado) {
    return response.json(resultado);
  } else {
    return response.status(400).json(resultado);
  }
}

export async function getPlanilhas(request: Request, response: Response) {
  const idInstrutor = Number(request.params.idInstrutor);
  const idAluno = Number(request.params.idAluno);

  const resultado = await findPlanilhas(idInstrutor, idAluno);

  return response.json(resultado);
}

export async function postPlanilha(request: Request, response: Response) {
  const { nm_planilha, id_servico } = request.body;

  const resultado = await createPlanilha(nm_planilha, id_servico);

  return response.json(resultado);
}

export async function postTreino(request: Request, response: Response) {
  const {
    nm_exercicio,
    id_grupoMuscular,
    id_planilha,
    qt_treino,
    qt_serie,
    kg_carga,
    ds_treino,
    gif_exercicio,
  } = request.body;

  const resultado = await createTreino(
    nm_exercicio,
    Number(id_grupoMuscular),
    Number(id_planilha),
    Number(qt_treino),
    Number(qt_serie),
    Number(kg_carga),
    ds_treino,
    gif_exercicio
  );

  return response.json(resultado);
}

export async function getEspecializacoes(request: Request, response: Response) {
  const resultado = await findEspecializacoes();
  const renamedData = resultado.map((item) => ({
    value: item.id_especializacao,
    label: item.nm_especializacao,
  }));
  return response.json(renamedData);
}

export async function getGrupoMuscular(request: Request, response: Response) {
  const resultado = await findGrupoMuscular();
  const renamedData = resultado.map((item) => ({
    value: item.id_grupoMuscular,
    label: item.nm_grupoMuscular,
  }));
  return response.json(renamedData);
}

export async function getCertificacao(request: Request, response: Response) {
  const resultado = await findCertificacao();
  const renamedData = resultado.map((item) => ({
    value: item.id_certificacao,
    label: item.nm_certificacao,
  }));
  return response.json(renamedData);
}

export async function getCidade(request: Request, response: Response) {
  const resultado = await findCidade();
  const renamedData = resultado.map((item) => ({
    value: item.id_cidade,
    label: item.nm_cidade,
  }));
  return response.json(renamedData);
}

export async function getExperiencia(request: Request, response: Response) {
  const resultado = await findExperiencia();
  const renamedData = resultado.map((item) => ({
    value: item.id_experiencia,
    label: item.nm_experiencia,
  }));
  return response.json(renamedData);
}

export async function deleteTreino(request: Request, response: Response) {
  const { id_treino } = request.body;
  const resultado = await eraseTreino(id_treino);

  return response.json(resultado);
}

export async function deletePlanilha(request: Request, response: Response) {
  const { id_planilha } = request.body;
  const resultado = await erasePlanilha(id_planilha);

  return response.json(resultado);
}

function areAllValuesNull(obj: InstrutorForms): boolean {
  if (obj) {
    return !obj.nm_instrutor ? true : false;
  } else {
    return false;
  }
}
