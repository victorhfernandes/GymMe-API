import { Router } from "express";
import {
  postInstrutor,
  postInstrutorCompleto,
  getInstrutores,
  getInstrutorById,
  getLoginInstrutor,
  getEspecializacoes,
  getInstrutorByEmail,
  getServicosInstrutorByStatus,
  putServicoStatus,
  getPlanilhas,
  postPlanilha,
  getGrupoMuscular,
  postTreino,
  deleteTreino,
  deletePlanilha,
  getCertificacao,
  getCidade,
  getExperiencia,
} from "../controllers/instrutor.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .patch("/servico/:idInstrutor&:idAluno", asyncHandler(putServicoStatus))
  .get("/planilha/:idInstrutor&:idAluno", asyncHandler(getPlanilhas))
  .post("/planilha", asyncHandler(postPlanilha))
  .delete("/planilha", asyncHandler(deletePlanilha))
  .post("/treino", asyncHandler(postTreino))
  .delete("/treino", asyncHandler(deleteTreino))
  .get("/servico/:id&:status", asyncHandler(getServicosInstrutorByStatus))
  .post("/cadastro", asyncHandler(postInstrutor))
  .patch("/cadastro/:id", asyncHandler(postInstrutorCompleto))
  .get("/", asyncHandler(getInstrutores)) //(?esp=)
  .get("/especializacao", asyncHandler(getEspecializacoes))
  .get("/grupomuscular", asyncHandler(getGrupoMuscular))
  .get("/certificacao", asyncHandler(getCertificacao))
  .get("/experiencia", asyncHandler(getExperiencia))
  .get("/cidade", asyncHandler(getCidade))
  .get("/:id", asyncHandler(getInstrutorById)) //(?compl=) (?isCadCompl=)
  .post("/login", asyncHandler(getLoginInstrutor))
  .get("/email", asyncHandler(getInstrutorByEmail));

export default router;
