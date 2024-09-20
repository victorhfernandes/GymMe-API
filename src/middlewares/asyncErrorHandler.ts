import { Request, Response, NextFunction } from "express-serve-static-core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import CustomError from "../utils/CustomError";

type AsyncFunc = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response>;

export default function asyncHandler(func: AsyncFunc) {
  return function (request: Request, response: Response, next: NextFunction) {
    func(request, response, next).catch(function (
      prismaError: PrismaClientKnownRequestError
    ) {
      let error: CustomError;
      if (prismaError.code === "P2002")
        error = duplicateErrorHandler(prismaError);
      else error = new CustomError(prismaError.message, 400);
      console.log(prismaError);
      next(error);
    });
  };
}

function duplicateErrorHandler(error: PrismaClientKnownRequestError) {
  let msg: string;
  if (error.meta) {
    const attr = String(error.meta.target).includes("email")
      ? "email"
      : String(error.meta.target);
    msg = `${attr} já cadastrado!`;
  } else {
    msg = "Bad Request";
  }
  return new CustomError(msg, 400);
}