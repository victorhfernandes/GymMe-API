import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createAluno,
  createAlunoCompleto,
  findLoginAluno,
  findAlunoById,
  findServicosAlunoByStatus,
  createServico,
  updateServicoStatusPagamento,
} from "../models/aluno.model";

type AlunoForms = {
  nm_aluno: string | null;
  celular_aluno: string | null;
  nascimento_aluno: Date | null;
} | null;

export async function postAluno(request: Request, response: Response) {
  const { email_aluno, senha_aluno } = request.body;
  const hash = await bcrypt.hash(senha_aluno, 13);
  const resultado = await createAluno(email_aluno, hash);
  return response.status(201).json(resultado);
}

export async function postAlunoCompleto(request: Request, response: Response) {
  let { doresPeito, desequilibrio, osseoArticular, medicado } = request.body;
  const {
    nm_aluno,
    celular_aluno,
    nascimento_aluno,
    cpf_aluno,
    foto_perfil,
    atestado,
  } = request.body;

  doresPeito = doresPeito === "true" ? true : false;
  desequilibrio = desequilibrio === "true" ? true : false;
  osseoArticular = osseoArticular === "true" ? true : false;
  medicado = medicado === "true" ? true : false;
  const dtNascimento = new Date(nascimento_aluno);
  const id = Number(request.params.id);

  const resultado = await createAlunoCompleto(
    nm_aluno,
    celular_aluno,
    dtNascimento,
    cpf_aluno,
    foto_perfil,
    atestado,
    doresPeito,
    desequilibrio,
    osseoArticular,
    medicado,
    id
  );
  return response.json(resultado);
}

export async function getAlunoById(request: Request, response: Response) {
  const id_aluno = request.params.id;
  const resultado = await findAlunoById(Number(id_aluno));
  if (request.query.isCadCompl) {
    const isCadCompl = !areAllValuesNull(resultado);
    return response.json(isCadCompl);
  }
  return response.json(resultado);
}

export async function getLoginAluno(request: Request, response: Response) {
  const { email_aluno, senha_aluno } = request.body;
  const resultado = await findLoginAluno(email_aluno);
  if (resultado) {
    const isValid = await bcrypt.compare(senha_aluno, resultado.senha_aluno);
    if (isValid) {
      return response.json({
        id_aluno: resultado.id_aluno,
      });
    } else {
      return response.status(400).json(null);
    }
  } else {
    return response.status(400).json(resultado);
  }
}

export async function postServico(request: Request, response: Response) {
  const { isSolicitacao } = request.body;
  const instrutor = Number(request.params.instrutor);
  const aluno = Number(request.params.aluno);
  if (isSolicitacao) {
    const resultado = await createServico(instrutor, aluno);
    return response.status(201).json(resultado);
  } else {
    return response.status(400).json("Solicitação Invalida!");
  }
}

export async function getServicosAlunoByStatus(
  request: Request,
  response: Response
) {
  const id = Number(request.params.id);
  const statusServico =
    request.params.statusServico === "true"
      ? true
      : request.params.statusServico === "false"
      ? false
      : null;
  const statusPagamento =
    request.params.statusPagamento === "true"
      ? true
      : request.params.statusPagamento === "false"
      ? false
      : null;

  const resultado = await findServicosAlunoByStatus(
    id,
    statusServico,
    statusPagamento
  );

  return response.json(resultado);
}

export async function putServicoStatusPagamento(
  request: Request,
  response: Response
) {
  const idInstrutor = Number(request.params.idInstrutor);
  const idAluno = Number(request.params.idAluno);
  const { statusPagamento } = request.body;

  const resultado = await updateServicoStatusPagamento(
    idInstrutor,
    idAluno,
    statusPagamento
  );
  if (resultado) {
    return response.json(resultado);
  } else {
    return response.status(400).json(resultado);
  }
}

function areAllValuesNull(obj: AlunoForms): boolean {
  if (obj) {
    return !obj.nm_aluno ? true : false;
  } else {
    return false;
  }
}
