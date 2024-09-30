import { Request, Response, NextFunction } from "express-serve-static-core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import CustomError from "../utils/CustomError";

type AsyncFunc = (
  request: Request<{}, {}, {}, any>,
  response: Response,
  next: NextFunction
) => Promise<Response>;

export default function asyncHandler(func: AsyncFunc) {
  return function (request: Request, response: Response, next: NextFunction) {
    func(request, response, next).catch(function (
      prismaError: PrismaClientKnownRequestError
    ) {
      let error = new CustomError(prismaError.message, 400);

      if (prismaError.code) {
        if (prismaError.code === "P2002") {
          error = duplicateErrorHandler(prismaError);
        }
        if (prismaError.code === "P2010") {
          error = new CustomError("Insira somente uma especialização!", 400);
        }
      }
      next(error);
    });
  };
}

function duplicateErrorHandler(error: PrismaClientKnownRequestError) {
  let msg: string;
  if (error.meta) {
    const attr = String(error.meta.target).includes("email")
      ? "Email"
      : String(error.meta.target);
    msg = `${attr} lndvnldvnl já cadastrado!`;
  } else {
    msg = "Bad Request";
  }
  return new CustomError(msg, 400);
}
