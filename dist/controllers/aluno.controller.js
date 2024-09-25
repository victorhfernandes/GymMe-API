"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAluno = postAluno;
exports.getAlunoByEmail = getAlunoByEmail;
exports.getLoginAluno = getLoginAluno;
const aluno_model_1 = require("../models/aluno.model");
async function postAluno(request, response) {
    const postAluno = await (0, aluno_model_1.createAluno)(request.body);
    return response.json(postAluno);
}
async function getAlunoByEmail(request, response) {
    const resultado = await (0, aluno_model_1.findAlunoByEmail)(request.body);
    return response.json(!!resultado); //retorna resultado convertido em boolean
}
async function getLoginAluno(request, response) {
    const resultado = await (0, aluno_model_1.findLoginAluno)(request.body);
    return response.json(resultado);
}
