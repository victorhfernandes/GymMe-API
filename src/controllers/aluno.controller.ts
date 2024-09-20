import { Request, Response } from "express-serve-static-core";
import { createAluno, findAlunoByEmail } from "../models/aluno.model";

export async function postAluno(request: Request, response: Response) {
  const postAluno = await createAluno(request.body);
  return response.json(postAluno);
}

export async function getAlunoByEmail(request: Request, response: Response) {
  const resultado = await findAlunoByEmail(request.params.email);
  return response.json(!!resultado); //retorna resultado convertido em boolean
}
