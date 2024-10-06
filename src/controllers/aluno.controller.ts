import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createAluno,
  findAlunoByEmail,
  findLoginAluno,
} from "../models/aluno.model";

export async function postAluno(request: Request, response: Response) {
  const { email_aluno, senha_aluno } = request.body;
  const hash = await bcrypt.hash(senha_aluno, 13);
  const resultado = await createAluno(email_aluno, hash);
  return response.status(201).json(resultado);
}

export async function getAlunoByEmail(request: Request, response: Response) {
  const resultado = await findAlunoByEmail(request.body);
  return response.json(!!resultado); //retorna resultado convertido em boolean
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
