import { Request, Response } from "express";
import {
  findInstrutor,
  findInstrutorById,
  createInstrutor,
} from "../models/instrutor.model";

export async function getInstrutor(request: Request, response: Response) {
  const getInstrutor = await findInstrutor();
  return response.json(getInstrutor);
}

export async function getInstrutorById(request: Request, response: Response) {
  const getInstrutorById = await findInstrutorById(parseInt(request.params.id));
  return response.json(getInstrutorById);
}
export async function postInstrutor(request: Request, response: Response) {
  const postInstrutor = await createInstrutor(request.body);
  return response.json(postInstrutor);
}
