"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInstrutor = postInstrutor;
exports.postInstrutorCompleto = postInstrutorCompleto;
exports.postLoginInstrutor = postLoginInstrutor;
exports.postLogOutInstrutor = postLogOutInstrutor;
exports.getInstrutorId = getInstrutorId;
exports.getInstrutores = getInstrutores;
exports.getInstrutorById = getInstrutorById;
exports.getLoginInstrutor = getLoginInstrutor;
exports.getInstrutorByEmail = getInstrutorByEmail;
exports.getServicosInstrutorByStatus = getServicosInstrutorByStatus;
exports.putServicoStatus = putServicoStatus;
exports.getPlanilhas = getPlanilhas;
exports.postPlanilha = postPlanilha;
exports.postTreino = postTreino;
exports.getEspecializacoes = getEspecializacoes;
exports.getGrupoMuscular = getGrupoMuscular;
exports.getCertificacao = getCertificacao;
exports.getCidade = getCidade;
exports.getExperiencia = getExperiencia;
exports.deleteTreino = deleteTreino;
exports.deletePlanilha = deletePlanilha;
const bcrypt_1 = __importDefault(require("bcrypt"));
const instrutor_model_1 = require("../models/instrutor.model");
async function postInstrutor(request, response) {
    const { email_instrutor, senha_instrutor } = request.body;
    const hash = await bcrypt_1.default.hash(senha_instrutor, 13);
    const resultado = await (0, instrutor_model_1.createInstrutor)(email_instrutor, hash);
    return response.status(201).json(resultado);
}
async function postInstrutorCompleto(request, response) {
    const { nm_instrutor, celular_instrutor, nascimento_instrutor, foto_perfil, cpf_instrutor, especializacoes, certificacoes, experiencias, cidades, } = request.body;
    const dtNascimento = new Date(nascimento_instrutor);
    const id = Number(request.params.id);
    const resultado = await (0, instrutor_model_1.createInstrutorCompleto)(nm_instrutor, celular_instrutor, dtNascimento, especializacoes, certificacoes, experiencias, cidades, foto_perfil, cpf_instrutor, id);
    return response.json(resultado);
}
async function postLoginInstrutor(request, response) {
    response.sendStatus(200);
}
async function postLogOutInstrutor(request, response) {
    if (!request.user)
        return response.sendStatus(401);
    request.logout((err) => {
        if (err)
            return response.sendStatus(400);
        response.sendStatus(200);
    });
}
async function getInstrutorId(request, response) {
    return request.user
        ? response.status(200).json(request.user)
        : response.sendStatus(401).json();
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
    const compl = request.query.compl;
    const resultado = !compl
        ? await (0, instrutor_model_1.findInstrutorById)(Number(id_instrutor))
        : compl === "true"
            ? await (0, instrutor_model_1.findInstrutorByIdCompleto)(Number(id_instrutor))
            : await (0, instrutor_model_1.findInstrutorByIdCompletoForm)(Number(id_instrutor));
    if (request.query.isCadCompl) {
        const isCadCompl = !areAllValuesNull(resultado);
        return response.json(isCadCompl);
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
async function getInstrutorByEmail(request, response) {
    const resultado = await (0, instrutor_model_1.findInstrutorByEmail)(request.body);
    return response.json(!!resultado); //retorna resultado convertido em boolean
}
async function getServicosInstrutorByStatus(request, response) {
    const id = Number(request.params.id);
    const status = request.params.status === "true"
        ? true
        : request.params.status === "false"
            ? false
            : null;
    const resultado = await (0, instrutor_model_1.findServicosInstrutorByStatus)(id, status);
    return response.json(resultado);
}
async function putServicoStatus(request, response) {
    const idInstrutor = Number(request.params.idInstrutor);
    const idAluno = Number(request.params.idAluno);
    const { statusServico } = request.body;
    const statusPagamento = statusServico ? false : null;
    const resultado = await (0, instrutor_model_1.updateServicoStatus)(idInstrutor, idAluno, statusServico, statusPagamento);
    if (resultado) {
        return response.json(resultado);
    }
    else {
        return response.status(400).json(resultado);
    }
}
async function getPlanilhas(request, response) {
    const idInstrutor = Number(request.params.idInstrutor);
    const idAluno = Number(request.params.idAluno);
    const resultado = await (0, instrutor_model_1.findPlanilhas)(idInstrutor, idAluno);
    return response.json(resultado);
}
async function postPlanilha(request, response) {
    const { nm_planilha, id_servico } = request.body;
    const resultado = await (0, instrutor_model_1.createPlanilha)(nm_planilha, id_servico);
    return response.json(resultado);
}
async function postTreino(request, response) {
    const { nm_exercicio, id_grupoMuscular, id_planilha, qt_treino, qt_serie, kg_carga, ds_treino, gif_exercicio, } = request.body;
    const resultado = await (0, instrutor_model_1.createTreino)(nm_exercicio, Number(id_grupoMuscular), Number(id_planilha), Number(qt_treino), Number(qt_serie), Number(kg_carga), ds_treino, gif_exercicio);
    return response.json(resultado);
}
async function getEspecializacoes(request, response) {
    const resultado = await (0, instrutor_model_1.findEspecializacoes)();
    const renamedData = resultado.map((item) => ({
        value: item.id_especializacao,
        label: item.nm_especializacao,
    }));
    return response.json(renamedData);
}
async function getGrupoMuscular(request, response) {
    const resultado = await (0, instrutor_model_1.findGrupoMuscular)();
    const renamedData = resultado.map((item) => ({
        value: item.id_grupoMuscular,
        label: item.nm_grupoMuscular,
    }));
    return response.json(renamedData);
}
async function getCertificacao(request, response) {
    const resultado = await (0, instrutor_model_1.findCertificacao)();
    const renamedData = resultado.map((item) => ({
        value: item.id_certificacao,
        label: item.nm_certificacao,
    }));
    return response.json(renamedData);
}
async function getCidade(request, response) {
    const resultado = await (0, instrutor_model_1.findCidade)();
    const renamedData = resultado.map((item) => ({
        value: item.id_cidade,
        label: item.nm_cidade,
    }));
    return response.json(renamedData);
}
async function getExperiencia(request, response) {
    const resultado = await (0, instrutor_model_1.findExperiencia)();
    const renamedData = resultado.map((item) => ({
        value: item.id_experiencia,
        label: item.nm_experiencia,
    }));
    return response.json(renamedData);
}
async function deleteTreino(request, response) {
    const { id_treino } = request.body;
    const resultado = await (0, instrutor_model_1.eraseTreino)(id_treino);
    return response.json(resultado);
}
async function deletePlanilha(request, response) {
    const { id_planilha } = request.body;
    const resultado = await (0, instrutor_model_1.erasePlanilha)(id_planilha);
    return response.json(resultado);
}
function areAllValuesNull(obj) {
    if (obj) {
        return !obj.nm_instrutor ? true : false;
    }
    else {
        return false;
    }
}
