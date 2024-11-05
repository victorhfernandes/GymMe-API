import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import {
  createAluno,
  createAlunoCompleto,
  findLoginAluno,
  findAlunoById,
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
  const { nm_aluno, celular_aluno, nascimento_aluno } = request.body;
  console.log(nascimento_aluno);
  const dtNascimento = new Date(nascimento_aluno);
  const id = Number(request.params.id);
  const resultado = await createAlunoCompleto(
    nm_aluno,
    celular_aluno,
    dtNascimento,
    id
  );
  return response.json(resultado);
}

export async function getAlunoById(request: Request, response: Response) {
  const id_aluno = request.params.id;
  const resultado = await findAlunoById(Number(id_aluno));
  if (request.query.isCadCompleto) {
    const isCadCompleto = !areAllValuesNull(resultado);
    return response.json(isCadCompleto);
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

function areAllValuesNull(obj: AlunoForms): boolean {
  if (obj) {
    return Object.values(obj).every((value) => value === null);
  } else {
    return false;
  }
}
