"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAluno = postAluno;
exports.postAlunoCompleto = postAlunoCompleto;
exports.getAlunoById = getAlunoById;
exports.getLoginAluno = getLoginAluno;
const bcrypt_1 = __importDefault(require("bcrypt"));
const aluno_model_1 = require("../models/aluno.model");
async function postAluno(request, response) {
    const { email_aluno, senha_aluno } = request.body;
    const hash = await bcrypt_1.default.hash(senha_aluno, 13);
    const resultado = await (0, aluno_model_1.createAluno)(email_aluno, hash);
    return response.status(201).json(resultado);
}
async function postAlunoCompleto(request, response) {
    const { nm_aluno, celular_aluno, nascimento_aluno } = request.body;
    console.log(nascimento_aluno);
    const dtNascimento = new Date(nascimento_aluno);
    const id = Number(request.params.id);
    const resultado = await (0, aluno_model_1.createAlunoCompleto)(nm_aluno, celular_aluno, dtNascimento, id);
    return response.json(resultado);
}
async function getAlunoById(request, response) {
    const id_aluno = request.params.id;
    const resultado = await (0, aluno_model_1.findAlunoById)(Number(id_aluno));
    if (request.query.isCadCompleto) {
        const isCadCompleto = !areAllValuesNull(resultado);
        return response.json(isCadCompleto);
    }
    return response.json(resultado);
}
async function getLoginAluno(request, response) {
    const { email_aluno, senha_aluno } = request.body;
    const resultado = await (0, aluno_model_1.findLoginAluno)(email_aluno);
    if (resultado) {
        const isValid = await bcrypt_1.default.compare(senha_aluno, resultado.senha_aluno);
        if (isValid) {
            return response.json({
                id_aluno: resultado.id_aluno,
            });
        }
        else {
            return response.status(400).json(null);
        }
    }
    else {
        return response.status(400).json(resultado);
    }
}
function areAllValuesNull(obj) {
    if (obj) {
        return Object.values(obj).every((value) => value === null);
    }
    else {
        return false;
    }
}
