import { Request, Response, NextFunction } from "express-serve-static-core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import CustomError from "./CustomError";

type AsyncFunc = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response>;

export default function asyncHandler(func: AsyncFunc) {
  return function (request: Request, response: Response, next: NextFunction) {
    func(request, response, next).catch(function (
      err: PrismaClientKnownRequestError
    ) {
      let error: CustomError;
      if (err.code === "P2002") error = duplicateErrorHandler(err);
      else error = new CustomError(err.code, 400);
      next(error);
    });
  };
}

function duplicateErrorHandler(error: PrismaClientKnownRequestError) {
  let msg: string;
  if (error.meta) {
    const attr = String(error.meta.target).split("_");
    msg = `${attr[0]} já cadastrado!`;
  } else {
    msg = "Bad Request";
  }
  return new CustomError(msg, 400);
}
