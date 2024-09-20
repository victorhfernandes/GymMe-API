import { NextFunction, Request, Response } from "express-serve-static-core";
import CustomError from "../utils/CustomError";
import { Router } from "express";

const router = Router();

router.all(
  "*",
  async function noExistingRoutesController(
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
);

export default router;
