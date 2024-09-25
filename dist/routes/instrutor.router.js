"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instrutor_controller_1 = require("../controllers/instrutor.controller");
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const router = (0, express_1.Router)();
router
    .post("/", (0, asyncErrorHandler_1.default)(instrutor_controller_1.postInstrutor))
    .get("/", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutores)) //(?esp=)
    .get("/login", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getLoginInstrutor))
    .get("/especializacao", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getEspecializacoes))
    .get("/email", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutorByEmail));
exports.default = router;
