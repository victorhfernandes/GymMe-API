"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instrutor_router_1 = __importDefault(require("./instrutor.router"));
const aluno_router_1 = __importDefault(require("./aluno.router"));
const router = (0, express_1.Router)();
router.use("/instrutor", instrutor_router_1.default);
router.use("/aluno", aluno_router_1.default);
exports.default = router;
