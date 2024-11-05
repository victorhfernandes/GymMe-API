"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInstrutor = postInstrutor;
exports.postInstrutorCompleto = postInstrutorCompleto;
exports.getInstrutores = getInstrutores;
exports.getInstrutorById = getInstrutorById;
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
async function postInstrutorCompleto(request, response) {
    const { nm_instrutor, cel_instrutor, nascimento_instrutor, foto_perfil, especializacoes, } = request.body;
    const renamedData = especializacoes.map((item) => ({
        id_especializacao: item.value,
        nm_especializacao: item.label,
    }));
    const dtNascimento = new Date(nascimento_instrutor);
    const id = Number(request.params.id);
    const resultado = await (0, instrutor_model_1.createInstrutorCompleto)(nm_instrutor, cel_instrutor, dtNascimento, renamedData, foto_perfil, id);
    return response.json(resultado);
}
/*Faz pesquisa de instrutores por Id de Especialização caso seja definido na url (?esp=),
caso não retorna todos os instrutores*/
async function getInstrutores(request, response) {
    const arrayEsp = Array.isArray(request.query.esp)
        ? request.query.esp.map(Number)
        : [Number(request.query.esp)];
    const resultado = await (0, instrutor_model_1.findInstrutores)(arrayEsp);
    return response.json(resultado);
}
async function getInstrutorById(request, response) {
    const id_instrutor = request.params.id;
    const resultado = await (0, instrutor_model_1.findInstrutorById)(Number(id_instrutor));
    if (request.query.isCadCompleto) {
        const isCadCompleto = !areAllValuesNull(resultado);
        return response.json(isCadCompleto);
    }
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
    const renamedData = resultado.map((item) => ({
        value: item.id_especializacao,
        label: item.nm_especializacao,
    }));
    return response.json(renamedData);
}
async function getInstrutorByEmail(request, response) {
    const resultado = await (0, instrutor_model_1.findInstrutorByEmail)(request.body);
    return response.json(!!resultado); //retorna resultado convertido em boolean
}
function areAllValuesNull(obj) {
    if (obj) {
        return !obj.nm_instrutor && !obj.cel_instrutor && !obj.cpf_instrutor
            ? true
            : false;
    }
    else {
        return false;
    }
}
