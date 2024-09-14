import { Request, Response, NextFunction } from "express-serve-static-core";
//import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import CustomError from "./CustomError";

export default function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  error.statusCode = error.statusCode || 500;
  logError(error);
  resError(response, error);
}

function logError(error: CustomError) {
  const objError = {
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  };
  console.error(objError);
}

function resError(response: Response, error: CustomError) {
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    response.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
}
