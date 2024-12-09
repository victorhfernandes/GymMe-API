"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAluno = postAluno;
exports.postAlunoCompleto = postAlunoCompleto;
exports.postLoginAluno = postLoginAluno;
exports.postLogOutAluno = postLogOutAluno;
exports.getAlunoId = getAlunoId;
exports.getAlunoById = getAlunoById;
exports.getAnaliseAluno = getAnaliseAluno;
exports.postServico = postServico;
exports.getServicosAlunoByStatus = getServicosAlunoByStatus;
exports.putServicoStatusPagamento = putServicoStatusPagamento;
const bcrypt_1 = __importDefault(require("bcrypt"));
const aluno_model_1 = require("../models/aluno.model");
async function postAluno(request, response) {
    const { email_aluno, senha_aluno } = request.body;
    const hash = await bcrypt_1.default.hash(senha_aluno, 13);
    const resultado = await (0, aluno_model_1.createAluno)(email_aluno, hash);
    return response.status(201).json(resultado);
}
async function postAlunoCompleto(request, response) {
    let { doresPeito, desequilibrio, osseoArticular, medicado } = request.body;
    const { nm_aluno, celular_aluno, nascimento_aluno, cpf_aluno, foto_perfil, atestado, } = request.body;
    doresPeito = doresPeito === "true" ? true : false;
    desequilibrio = desequilibrio === "true" ? true : false;
    osseoArticular = osseoArticular === "true" ? true : false;
    medicado = medicado === "true" ? true : false;
    const dtNascimento = new Date(nascimento_aluno);
    const id = Number(request.params.id);
    const resultado = await (0, aluno_model_1.createAlunoCompleto)(nm_aluno, celular_aluno, dtNascimento, cpf_aluno, foto_perfil, atestado, doresPeito, desequilibrio, osseoArticular, medicado, id);
    return response.json(resultado);
}
async function postLoginAluno(request, response) {
    response.sendStatus(200);
}
async function postLogOutAluno(request, response) {
    if (!request.user)
        return response.sendStatus(401);
    request.logout((err) => {
        if (err)
            return response.sendStatus(400);
        response.sendStatus(200);
    });
}
async function getAlunoId(request, response) {
    return request.user
        ? response.status(200).json(request.user)
        : response.sendStatus(401).json();
}
async function getAlunoById(request, response) {
    const id_aluno = request.params.id;
    const resultado = await (0, aluno_model_1.findAlunoById)(Number(id_aluno));
    if (request.query.isCadCompl) {
        const isCadCompl = !areAllValuesNull(resultado);
        return response.json(isCadCompl);
    }
    return response.json(resultado);
}
async function getAnaliseAluno(request, response) {
    const id_aluno = request.params.id;
    const resultado = await (0, aluno_model_1.findAnaliseAluno)(Number(id_aluno));
    return response.json(resultado);
}
async function postServico(request, response) {
    const { isSolicitacao } = request.body;
    const instrutor = Number(request.params.instrutor);
    const aluno = Number(request.params.aluno);
    if (isSolicitacao) {
        const resultado = await (0, aluno_model_1.createServico)(instrutor, aluno);
        return response.status(201).json(resultado);
    }
    else {
        return response.status(400).json("Solicitação Invalida!");
    }
}
async function getServicosAlunoByStatus(request, response) {
    const id = Number(request.params.id);
    const statusServico = request.params.statusServico === "true"
        ? true
        : request.params.statusServico === "false"
            ? false
            : null;
    const statusPagamento = request.params.statusPagamento === "true"
        ? true
        : request.params.statusPagamento === "false"
            ? false
            : null;
    const resultado = await (0, aluno_model_1.findServicosAlunoByStatus)(id, statusServico, statusPagamento);
    return response.json(resultado);
}
async function putServicoStatusPagamento(request, response) {
    const idInstrutor = Number(request.params.idInstrutor);
    const idAluno = Number(request.params.idAluno);
    const { statusPagamento } = request.body;
    const resultado = await (0, aluno_model_1.updateServicoStatusPagamento)(idInstrutor, idAluno, statusPagamento);
    if (resultado) {
        return response.json(resultado);
    }
    else {
        return response.status(400).json(resultado);
    }
}
function areAllValuesNull(obj) {
    if (obj) {
        return !obj.nm_aluno ? true : false;
    }
    else {
        return false;
    }
}
