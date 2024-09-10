import { Router } from "express";
import { postAluno } from "../controllers/aluno.controller";

const router = Router();

router.post("/", postAluno);

export default router;
