import { Router } from "express";
import {
  postAluno,
  getLoginAluno,
  getAluno,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/cadastro", asyncHandler(postAluno))
  .get("/:id", asyncHandler(getAluno))
  .post("/login", asyncHandler(getLoginAluno));

export default router;
