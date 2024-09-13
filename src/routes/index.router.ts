import { Router } from "express";
import instrutorRouter from "./instrutor.router";
import alunoRouter from "./aluno.router";
import allRouter from "./all.router";

const router = Router();

router.use("/instrutor", instrutorRouter);
router.use("/aluno", alunoRouter);
router.all("*", allRouter);

export default router;
