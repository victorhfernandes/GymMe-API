import { Request, Response, NextFunction } from "express-serve-static-core";

type AsyncFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = (func: AsyncFunc) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: any) => next(err));
  };
};

export default asyncHandler;
