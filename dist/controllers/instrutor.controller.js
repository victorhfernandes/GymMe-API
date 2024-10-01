"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInstrutor = postInstrutor;
exports.getInstrutores = getInstrutores;
exports.getLoginInstrutor = getLoginInstrutor;
exports.getEspecializacoes = getEspecializacoes;
exports.getInstrutorByEmail = getInstrutorByEmail;
const instrutor_model_1 = require("../models/instrutor.model");
async function postInstrutor(request, response) {
    const resultado = await (0, instrutor_model_1.createInstrutor)(request.body);
    return response.status(201).json(resultado);
}
/*Faz pesquisa de instrutores por Id de Especialização caso seja definido na url (?esp=),
caso não retorna todos os instrutores*/
async function getInstrutores(request, response) {
    const resultado = request.query.esp
        ? await (0, instrutor_model_1.findInstrutoresByEspecializacao)(request.query.esp)
        : await (0, instrutor_model_1.findInstrutores)();
    return response.json(resultado);
}
async function getLoginInstrutor(request, response) {
    const resultado = await (0, instrutor_model_1.findLoginInstrutor)(request.body);
    if (resultado) {
        return response.json(resultado);
    }
    else {
        return response.status(400).json(resultado);
    }
}
async function getEspecializacoes(request, response) {
    const resultado = await (0, instrutor_model_1.findEspecializacoes)();
    return response.json(resultado);
}
async function getInstrutorByEmail(request, response) {
    const resultado = await (0, instrutor_model_1.findInstrutorByEmail)(request.body);
    return response.json(!!resultado); //retorna resultado convertido em boolean
}
