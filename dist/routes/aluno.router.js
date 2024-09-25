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
    .post("/", (0, asyncErrorHandler_1.default)(aluno_controller_1.postAluno))
    .get("/email", (0, asyncErrorHandler_1.default)(aluno_controller_1.getAlunoByEmail))
    .get("/login", (0, asyncErrorHandler_1.default)(aluno_controller_1.getLoginAluno));
exports.default = router;
