import { Router } from "express";
import instrutorRouter from "./instrutor.router";
import alunoRouter from "./aluno.router";

const router = Router();

router.use("/instrutor", instrutorRouter);
router.use("/aluno", alunoRouter);

export default router;
