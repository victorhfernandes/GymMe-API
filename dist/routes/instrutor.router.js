"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const instrutor_controller_1 = require("../controllers/instrutor.controller");
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const router = (0, express_1.Router)();
router
    .get("/login/status", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutorId))
    .post("/login", passport_1.default.authenticate("instrutor-local"), instrutor_controller_1.postLoginInstrutor)
    .post("/logout", instrutor_controller_1.postLogOutInstrutor)
    .patch("/servico/:idInstrutor&:idAluno", (0, asyncErrorHandler_1.default)(instrutor_controller_1.putServicoStatus))
    .get("/planilha/:idInstrutor&:idAluno", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getPlanilhas))
    .post("/planilha", (0, asyncErrorHandler_1.default)(instrutor_controller_1.postPlanilha))
    .delete("/planilha", (0, asyncErrorHandler_1.default)(instrutor_controller_1.deletePlanilha))
    .post("/treino", (0, asyncErrorHandler_1.default)(instrutor_controller_1.postTreino))
    .delete("/treino", (0, asyncErrorHandler_1.default)(instrutor_controller_1.deleteTreino))
    .get("/servico/:id&:status", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getServicosInstrutorByStatus))
    .post("/cadastro", (0, asyncErrorHandler_1.default)(instrutor_controller_1.postInstrutor))
    .patch("/cadastro/:id", (0, asyncErrorHandler_1.default)(instrutor_controller_1.postInstrutorCompleto))
    .get("/", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutores)) //(?esp=)
    .get("/especializacao", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getEspecializacoes))
    .get("/grupomuscular", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getGrupoMuscular))
    .get("/certificacao", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getCertificacao))
    .get("/experiencia", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getExperiencia))
    .get("/cidade", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getCidade))
    .get("/:id", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutorById)) //(?compl=) (?isCadCompl=)
    .post("/login", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getLoginInstrutor))
    .get("/email", (0, asyncErrorHandler_1.default)(instrutor_controller_1.getInstrutorByEmail));
exports.default = router;
