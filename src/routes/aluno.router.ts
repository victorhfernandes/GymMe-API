import { Router } from "express";
import {
  postAluno,
  getAlunoByEmail,
  getLoginAluno,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/cadastro", asyncHandler(postAluno))
  .get("/email", asyncHandler(getAlunoByEmail))
  .post("/login", asyncHandler(getLoginAluno));

export default router;
