"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAluno = createAluno;
exports.createAlunoCompleto = createAlunoCompleto;
exports.findAlunoById = findAlunoById;
exports.findAnaliseAluno = findAnaliseAluno;
exports.findLoginAluno = findLoginAluno;
exports.createServico = createServico;
exports.findServicosAlunoByStatus = findServicosAlunoByStatus;
exports.updateServicoStatusPagamento = updateServicoStatusPagamento;
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
async function createAlunoCompleto(nm_aluno, celular_aluno, nascimento_aluno, cpf_aluno, foto_perfil, atestado, doresPeito, desequilibrio, osseoArticular, medicado, id) {
    const resultado = await prisma_util_1.prisma.aluno.update({
        where: {
            id_aluno: id,
        },
        data: {
            nm_aluno: nm_aluno,
            celular_aluno: celular_aluno,
            nascimento_aluno: nascimento_aluno,
            cpf_aluno: cpf_aluno,
            foto_perfil: foto_perfil,
            atestado: atestado,
            doresPeito: doresPeito,
            desequilibrio: desequilibrio,
            osseoArticular: osseoArticular,
            medicado: medicado,
        },
    });
    return resultado;
}
async function findAlunoById(id_aluno) {
    const resultado = await prisma_util_1.prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno,
        },
        select: {
            nm_aluno: true,
            celular_aluno: true,
            nascimento_aluno: true,
            cpf_aluno: true,
            foto_perfil: true,
            atestado: true,
            doresPeito: true,
            desequilibrio: true,
            osseoArticular: true,
            medicado: true,
        },
    });
    return resultado;
}
async function findAnaliseAluno(id) {
    const resultado = await prisma_util_1.prisma.aluno.findUnique({
        where: {
            id_aluno: id,
        },
        select: {
            nm_aluno: true,
            foto_perfil: true,
            atestado: true,
            nascimento_aluno: true,
            doresPeito: true,
            desequilibrio: true,
            osseoArticular: true,
            medicado: true,
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
async function createServico(instrutor, aluno) {
    const resultado = await prisma_util_1.prisma.servico.create({
        data: {
            id_instrutor: instrutor,
            id_aluno: aluno,
        },
    });
    return resultado;
}
async function findServicosAlunoByStatus(id, statusServico, statusPagamento) {
    const resultado = await prisma_util_1.prisma.servico.findMany({
        where: {
            id_aluno: id,
            status_servico: statusServico,
            status_pagamento: statusPagamento,
        },
        include: {
            tb_instrutor: {
                select: {
                    id_instrutor: true,
                    foto_perfil: true,
                    nm_instrutor: true,
                    especializacoes: {
                        include: {
                            especializacao: {
                                select: {
                                    nm_especializacao: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            updated_at: "desc",
        },
    });
    const formattedResult = resultado.map((servico) => {
        const instrutor = servico.tb_instrutor;
        const especializacoes = instrutor.especializacoes
            .map((especializacao) => especializacao.especializacao.nm_especializacao)
            .sort();
        return {
            id_instrutor: instrutor.id_instrutor,
            foto_perfil: instrutor.foto_perfil,
            nm_instrutor: instrutor.nm_instrutor,
            especializacoes: especializacoes,
            status_servico: servico.status_servico,
            status_pagamento: servico.status_pagamento,
            updated_at: servico.updated_at,
        };
    });
    return formattedResult;
}
async function updateServicoStatusPagamento(idInstrutor, idAluno, statusPagamento) {
    const resultado = await prisma_util_1.prisma.servico.updateMany({
        where: {
            id_instrutor: idInstrutor,
            id_aluno: idAluno,
        },
        data: {
            status_pagamento: statusPagamento,
        },
    });
    return resultado.count === 1;
}
