import { Request, Response } from "express";
import { createAluno } from "../models/aluno.model";

export async function postAluno(request: Request, response: Response) {
  const postAluno = await createAluno(request.body);
  return response.json(postAluno);
}
