import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "./CustomError";

export default function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    devErrors(response, error);
  } else if (process.env.NODE_ENV === "production") {
    /*if(error.name === 'CastError') error = castErrorHandler(error);
    if(error.code === 11000) error = duplicateKeyErrorHandler(error);
    if(error.name === 'ValidationError') error = validationErrorHandler(error);*/
    prodErrors(response, error);
  }
}

function devErrors(response: Response, error: CustomError) {
  response.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
}

function prodErrors(response: Response, error: CustomError) {
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
