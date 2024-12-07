import { Router } from "express";
import passport from "passport";
import {
  postAluno,
  postAlunoCompleto,
  getLoginAluno,
  getAlunoById,
  postServico,
  getAnaliseAluno,
  getServicosAlunoByStatus,
  putServicoStatusPagamento,
} from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
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
  .post("/login", asyncHandler(getLoginAluno))
  .get("/analise/:id", asyncHandler(getAnaliseAluno));

export default router;
