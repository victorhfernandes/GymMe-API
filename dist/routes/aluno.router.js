"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const aluno_controller_1 = require("../controllers/aluno.controller");
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const router = (0, express_1.Router)();
router
    .get("/login/status", (0, asyncErrorHandler_1.default)(aluno_controller_1.getAlunoId))
    .post("/login", passport_1.default.authenticate("aluno-local"), aluno_controller_1.postLoginAluno)
    .post("/logout", aluno_controller_1.postLogOutAluno)
    .post("/servico/:instrutor&:aluno", (0, asyncErrorHandler_1.default)(aluno_controller_1.postServico))
    .get("/servico/:id&:statusServico&:statusPagamento", (0, asyncErrorHandler_1.default)(aluno_controller_1.getServicosAlunoByStatus))
    .patch("/servico/:idInstrutor&:idAluno", (0, asyncErrorHandler_1.default)(aluno_controller_1.putServicoStatusPagamento))
    .post("/cadastro", (0, asyncErrorHandler_1.default)(aluno_controller_1.postAluno))
    .patch("/cadastro/:id", (0, asyncErrorHandler_1.default)(aluno_controller_1.postAlunoCompleto))
    .get("/:id", (0, asyncErrorHandler_1.default)(aluno_controller_1.getAlunoById)) //(?isCadCompl=)
    .get("/analise/:id", (0, asyncErrorHandler_1.default)(aluno_controller_1.getAnaliseAluno));
exports.default = router;
