"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstrutor = createInstrutor;
exports.findInstrutores = findInstrutores;
exports.findInstrutoresByEspecializacao = findInstrutoresByEspecializacao;
exports.findLoginInstrutor = findLoginInstrutor;
exports.findEspecializacoes = findEspecializacoes;
exports.findInstrutorByEmail = findInstrutorByEmail;
const prisma_util_1 = require("../utils/prisma.util");
//Create
async function createInstrutor(email_instrutor, senha_instrutor) {
    const resultado = await prisma_util_1.prisma.instrutor.create({
        data: {
            email_instrutor: email_instrutor,
            senha_instrutor: senha_instrutor,
        },
    });
    return resultado;
}
//Read
async function findInstrutores() {
    const resultado = await prisma_util_1.prisma.$queryRaw `SELECT i.nm_instrutor AS nome, 
  GROUP_CONCAT(e.nm_especializacao ORDER BY e.nm_especializacao SEPARATOR '; ') AS especializacoes
  FROM tb_instrutorEspecializacao ie
  JOIN tb_instrutor i ON ie.id_instrutor = i.id_instrutor
  JOIN tb_especializacao e ON ie.id_especializacao = e.id_especializacao
  GROUP BY i.id_instrutor
  ORDER BY i.id_instrutor;`;
    return resultado;
}
//Implementar OR no WHERE
async function findInstrutoresByEspecializacao(especializacao) {
    const resultado = await prisma_util_1.prisma.$queryRaw `SELECT i.nm_instrutor AS nome, 
  GROUP_CONCAT(e.nm_especializacao ORDER BY e.nm_especializacao SEPARATOR '; ') AS especializacoes
  FROM tb_instrutorEspecializacao ie
  JOIN tb_instrutor i ON ie.id_instrutor = i.id_instrutor
  JOIN tb_especializacao e ON ie.id_especializacao = e.id_especializacao
  WHERE e.id_especializacao = ${especializacao} 
  GROUP BY i.id_instrutor
  ORDER BY i.id_instrutor;`;
    return resultado;
}
async function findLoginInstrutor(email_instrutor) {
    const resultado = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            email_instrutor: email_instrutor,
        },
        select: {
            id_instrutor: true,
            senha_instrutor: true,
        },
    });
    return resultado;
}
async function findEspecializacoes() {
    const resultado = await prisma_util_1.prisma.especializacao.findMany();
    return resultado;
}
async function findInstrutorByEmail(body) {
    const { email_instrutor } = body;
    const resultado = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            email_instrutor: email_instrutor,
        },
        select: {
            id_instrutor: true,
        },
    });
    return resultado;
}
