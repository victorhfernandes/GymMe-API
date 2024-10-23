"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAluno = createAluno;
exports.findAluno = findAluno;
exports.findLoginAluno = findLoginAluno;
const prisma_util_1 = require("../utils/prisma.util");
async function createAluno(email_aluno, senha_aluno) {
    const resultado = await prisma_util_1.prisma.aluno.create({
        data: {
            email_aluno: email_aluno,
            senha_aluno: senha_aluno,
        },
    });
    return resultado;
}
async function findAluno(id_aluno) {
    const resultado = await prisma_util_1.prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno,
        },
        select: {
            nm_aluno: true,
            celular_aluno: true,
            nascimento_aluno: true,
        },
    });
    return resultado;
}
async function findLoginAluno(email_aluno) {
    const resultado = await prisma_util_1.prisma.aluno.findUnique({
        where: {
            email_aluno: email_aluno,
        },
        select: {
            id_aluno: true,
            senha_aluno: true,
        },
    });
    return resultado;
}
