import { Router } from "express";
import { postAluno, getAlunoByEmail, getLoginAluno } from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/", asyncHandler(postAluno))
  .get("/:email", asyncHandler(getAlunoByEmail))
  .get("/login", asyncHandler(getLoginAluno));

export default router;
