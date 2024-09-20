import { Router } from "express";
import {
  postInstrutor,
  getLoginInstrutor,
  getEspecializacoes,
  getInstrutores,
  getInstrutorByEmail,
} from "../controllers/instrutor.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router
  .post("/", asyncHandler(postInstrutor))
  .get("/login", asyncHandler(getLoginInstrutor))
  .get("/", asyncHandler(getInstrutores))
  .get("/especializacao", asyncHandler(getEspecializacoes))
  .get("/:email", asyncHandler(getInstrutorByEmail));

export default router;
