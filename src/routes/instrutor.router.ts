import { Router } from "express";
import {
  postInstrutor,
  postInstrutorCompleto,
  getInstrutores,
  getInstrutorById,
  getLoginInstrutor,
  getEspecializacoes,
  getInstrutorByEmail,
} from "../controllers/instrutor.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/cadastro", asyncHandler(postInstrutor))
  .patch("/cadastro/:id", asyncHandler(postInstrutorCompleto))
  .get("/", asyncHandler(getInstrutores)) //(?esp=)
  .get("/especializacao", asyncHandler(getEspecializacoes))
  .get("/:id", asyncHandler(getInstrutorById))
  .post("/login", asyncHandler(getLoginInstrutor))
  .get("/email", asyncHandler(getInstrutorByEmail));

export default router;
