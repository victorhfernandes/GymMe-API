import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  error.statusCode = error.statusCode || 500;

  response.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    error: error,
  });
};

export default errorHandler;
