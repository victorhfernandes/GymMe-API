import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createInstrutor,
  findInstrutores,
  findLoginInstrutor,
  findEspecializacoes,
  findInstrutoresByEspecializacao,
  findInstrutorByEmail,
} from "../models/instrutor.model";

type queryEspecializacao = {
  esp: number;
};

export async function postInstrutor(request: Request, response: Response) {
  const { email_instrutor, senha_instrutor } = request.body;
  const hash = await bcrypt.hash(senha_instrutor, 13);
  const resultado = await createInstrutor(email_instrutor, hash);
  return response.status(201).json(resultado);
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
  return response.json(resultado);
}

export async function getInstrutorByEmail(
  request: Request,
  response: Response
) {
  const resultado = await findInstrutorByEmail(request.body);
  return response.json(!!resultado); //retorna resultado convertido em boolean
}
