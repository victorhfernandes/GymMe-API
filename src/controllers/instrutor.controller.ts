import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createInstrutor,
  createInstrutorCompleto,
  findInstrutores,
  findInstrutorById,
  findLoginInstrutor,
  findEspecializacoes,
  findInstrutoresByEspecializacao,
  findInstrutorByEmail,
} from "../models/instrutor.model";

type queryEspecializacao = {
  esp: number;
};

type InstrutorForms = {
  nm_instrutor: string | null;
  cel_instrutor: string | null;
  nascimento_instrutor: Date | null;
} | null;

type EspecializacaoFront = {
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
    cel_instrutor,
    nascimento_instrutor,
    foto_perfil,
    especializacoes,
  } = request.body;
  const renamedData = especializacoes.map((item: EspecializacaoFront) => ({
    id_especializacao: item.value,
    nm_especializacao: item.label,
  }));
  const dtNascimento = new Date(nascimento_instrutor);
  const id = Number(request.params.id);
  const resultado = await createInstrutorCompleto(
    nm_instrutor,
    cel_instrutor,
    dtNascimento,
    renamedData,
    foto_perfil,
    id
  );
  return response.json(resultado);
}

/*Faz pesquisa de instrutores por Id de Especialização caso seja definido na url (?esp=),
caso não retorna todos os instrutores*/
export async function getInstrutores(
  request: Request<{}, {}, {}, queryEspecializacao>,
  response: Response
) {
  const resultado = request.query.esp
    ? await findInstrutoresByEspecializacao(request.query.esp)
    : await findInstrutores();

  return response.json(resultado);
}

export async function getInstrutorById(request: Request, response: Response) {
  const id_instrutor = request.params.id;
  const resultado = await findInstrutorById(Number(id_instrutor));
  const isNull = areAllValuesNull(resultado);
  return response.json(isNull);
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

export async function getEspecializacoes(request: Request, response: Response) {
  const resultado = await findEspecializacoes();
  const renamedData = resultado.map((item) => ({
    value: item.id_especializacao,
    label: item.nm_especializacao,
  }));
  return response.json(renamedData);
}

export async function getInstrutorByEmail(
  request: Request,
  response: Response
) {
  const resultado = await findInstrutorByEmail(request.body);
  return response.json(!!resultado); //retorna resultado convertido em boolean
}

function areAllValuesNull(obj: InstrutorForms): boolean {
  if (obj) {
    return Object.values(obj).every((value) => value === null);
  } else {
    return false;
  }
}
