"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInstrutor = postInstrutor;
exports.getInstrutores = getInstrutores;
exports.getLoginInstrutor = getLoginInstrutor;
exports.getEspecializacoes = getEspecializacoes;
exports.getInstrutorByEmail = getInstrutorByEmail;
const bcrypt_1 = __importDefault(require("bcrypt"));
const instrutor_model_1 = require("../models/instrutor.model");
async function postInstrutor(request, response) {
    const { email_instrutor, senha_instrutor } = request.body;
    const hash = await bcrypt_1.default.hash(senha_instrutor, 13);
    const resultado = await (0, instrutor_model_1.createInstrutor)(email_instrutor, hash);
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
    const { email_instrutor, senha_instrutor } = request.body;
    const resultado = await (0, instrutor_model_1.findLoginInstrutor)(email_instrutor);
    if (resultado) {
        const isValid = await bcrypt_1.default.compare(senha_instrutor, resultado.senha_instrutor);
        if (isValid) {
            return response.json({
                id_instrutor: resultado.id_instrutor,
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
async function getEspecializacoes(request, response) {
    const resultado = await (0, instrutor_model_1.findEspecializacoes)();
    return response.json(resultado);
}
async function getInstrutorByEmail(request, response) {
    const resultado = await (0, instrutor_model_1.findInstrutorByEmail)(request.body);
    return response.json(!!resultado); //retorna resultado convertido em boolean
}
