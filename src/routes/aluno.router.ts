import { Router } from "express";
import {
  postAluno,
  postAlunoCompleto,
  getLoginAluno,
  getAluno,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/cadastro", asyncHandler(postAluno))
  .patch("/cadastro/:id", asyncHandler(postAlunoCompleto))
  .get("/:id", asyncHandler(getAluno))
  .post("/login", asyncHandler(getLoginAluno));

export default router;
