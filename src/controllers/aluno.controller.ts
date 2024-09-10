import { Request, Response } from "express";
import { createAluno } from "../models/aluno.model";

export const postAluno = async (request: Request, response: Response) => {
  const postAluno = await createAluno(request.body);
  return response.json(postAluno);
};
