import { Router } from "express";
import {
  postInstrutor,
  getInstrutores,
  getLoginInstrutor,
  getEspecializacoes,
  getInstrutorByEmail,
} from "../controllers/instrutor.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/", asyncHandler(postInstrutor))
  .get("/:esp", asyncHandler(getInstrutores))
  .get("/login", asyncHandler(getLoginInstrutor))
  .get("/especializacao", asyncHandler(getEspecializacoes))
  .get("/email", asyncHandler(getInstrutorByEmail));

export default router;
