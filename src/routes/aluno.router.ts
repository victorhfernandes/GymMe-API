import { Router } from "express";
import passport from "passport";
import {
  postAluno,
  postAlunoCompleto,
  postLoginAluno,
  postLogOutAluno,
  getAlunoId,
  getAlunoById,
  postServico,
  getAnaliseAluno,
  getServicosAlunoByStatus,
  putServicoStatusPagamento,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .get("/login/status", asyncHandler(getAlunoId))
  .post("/login", passport.authenticate("aluno-local"), postLoginAluno)
  .post("/logout", postLogOutAluno)
  .post("/servico/:instrutor&:aluno", asyncHandler(postServico))
  .get(
    "/servico/:id&:statusServico&:statusPagamento",
    asyncHandler(getServicosAlunoByStatus)
  )
  .patch(
    "/servico/:idInstrutor&:idAluno",
    asyncHandler(putServicoStatusPagamento)
  )
  .post("/cadastro", asyncHandler(postAluno))
  .patch("/cadastro/:id", asyncHandler(postAlunoCompleto))
  .get("/:id", asyncHandler(getAlunoById)) //(?isCadCompl=)
  .get("/analise/:id", asyncHandler(getAnaliseAluno));

export default router;
