import { Router } from "express";
import {
  postAluno,
  postAlunoCompleto,
  getLoginAluno,
  getAlunoById,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/cadastro", asyncHandler(postAluno))
  .patch("/cadastro/:id", asyncHandler(postAlunoCompleto))
  .get("/:id", asyncHandler(getAlunoById))
  .post("/login", asyncHandler(getLoginAluno));

export default router;
