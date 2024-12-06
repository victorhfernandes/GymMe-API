"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aluno_controller_1 = require("../controllers/aluno.controller");
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const router = (0, express_1.Router)();
router
    .post("/servico/:instrutor&:aluno", (0, asyncErrorHandler_1.default)(aluno_controller_1.postServico))
    .get("/servico/:id&:statusServico&:statusPagamento", (0, asyncErrorHandler_1.default)(aluno_controller_1.getServicosAlunoByStatus))
    .patch("/servico/:idInstrutor&:idAluno", (0, asyncErrorHandler_1.default)(aluno_controller_1.putServicoStatusPagamento))
    .post("/cadastro", (0, asyncErrorHandler_1.default)(aluno_controller_1.postAluno))
    .patch("/cadastro/:id", (0, asyncErrorHandler_1.default)(aluno_controller_1.postAlunoCompleto))
    .get("/:id", (0, asyncErrorHandler_1.default)(aluno_controller_1.getAlunoById)) //(?isCadCompl=)
    .post("/login", (0, asyncErrorHandler_1.default)(aluno_controller_1.getLoginAluno));
exports.default = router;
