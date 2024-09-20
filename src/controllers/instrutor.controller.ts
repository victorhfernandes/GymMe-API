import { Request, Response } from "express-serve-static-core";
import {
  createInstrutor,
  findLoginInstrutor,
  findEspecializacoes,
  findInstrutores,
  findInstrutoresByEspecializacao,
  findInstrutorByEmail,
} from "../models/instrutor.model";

type queryEspecializacao = {
  esp: number;
};

export async function postInstrutor(request: Request, response: Response) {
  const resultado = await createInstrutor(request.body);
  return response.status(201).json(resultado);
}

export async function getLoginInstrutor(request: Request, response: Response) {
  const resultado = await findLoginInstrutor(request.body);
  return response.json(resultado);
}

export async function getEspecializacoes(request: Request, response: Response) {
  const resultado = await findEspecializacoes();
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

  console.log(request.query.esp);

  return response.json(resultado);
}

export async function getInstrutorByEmail(
  request: Request,
  response: Response
) {
  const resultado = await findInstrutorByEmail(request.params.email);
  return response.json(resultado);
}
