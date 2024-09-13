import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";

export async function allController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const err = new CustomError(
    `Rota ${request.originalUrl} não existe no servidor!`,
    404
  );
  next(err);
}
