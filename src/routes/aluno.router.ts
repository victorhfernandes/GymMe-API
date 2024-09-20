import { Router } from "express";
import { postAluno, getAlunoByEmail } from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/", asyncHandler(postAluno))
  .get("/:email", asyncHandler(getAlunoByEmail));

export default router;
