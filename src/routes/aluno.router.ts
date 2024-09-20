import { Router } from "express";
import { postAluno } from "../controllers/aluno.controller";
import asyncHandler from "../middlewares/asyncErrorHandler";

const router = Router();

router.post("/", asyncHandler(postAluno));

export default router;
