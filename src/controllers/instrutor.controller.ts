import { Request, Response } from "express";
import {
  findInstrutor,
  findInstrutorById,
  createInstrutor,
} from "../models/instrutor.model";

export const getInstrutor = async (request: Request, response: Response) => {
  const getInstrutor = await findInstrutor();
  return response.json(getInstrutor);
};

export const getInstrutorById = async (
  request: Request,
  response: Response
) => {
  const getInstrutorById = await findInstrutorById(parseInt(request.params.id));
  return response.json(getInstrutorById);
};

export const postInstrutor = async (request: Request, response: Response) => {
  const postInstrutor = await createInstrutor(request.body);
  return response.json(postInstrutor);
};
