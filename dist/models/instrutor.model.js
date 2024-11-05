"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstrutor = createInstrutor;
exports.createInstrutorCompleto = createInstrutorCompleto;
exports.findInstrutores = findInstrutores;
exports.findInstrutorById = findInstrutorById;
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
async function createInstrutorCompleto(nm_instrutor, cel_instrutor, nascimento_instrutor, especializacoes, foto_perfil, id) {
    const resultado = await prisma_util_1.prisma.instrutor.update({
        where: {
            id_instrutor: id,
        },
        data: {
            nm_instrutor: nm_instrutor,
            cel_instrutor: cel_instrutor,
            nascimento_instrutor: nascimento_instrutor,
            foto_perfil: foto_perfil,
        },
    });
    especializacoes.map(async (item) => {
        const resultado2 = await prisma_util_1.prisma.instrutorEspecializacao.create({
            data: {
                id_instrutor: id,
                id_especializacao: item.id_especializacao,
            },
        });
    });
    return resultado.id_instrutor === id;
}
//Read
async function findInstrutores(id_especializacao) {
    let instrutores;
    if (id_especializacao[0]) {
        instrutores = await prisma_util_1.prisma.instrutor.findMany({
            where: {
                especializacoes: {
                    some: {
                        especializacao: {
                            id_especializacao: {
                                in: id_especializacao,
                            },
                        },
                    },
                },
            },
            select: {
                nm_instrutor: true,
                foto_perfil: true,
                especializacoes: {
                    select: {
                        especializacao: {
                            select: {
                                nm_especializacao: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                id_instrutor: "asc",
            },
        });
    }
    else {
        instrutores = await prisma_util_1.prisma.instrutor.findMany({
            select: {
                nm_instrutor: true,
                foto_perfil: true,
                especializacoes: {
                    select: {
                        especializacao: {
                            select: {
                                nm_especializacao: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                id_instrutor: "asc",
            },
        });
    }
    const notNullInstrutores = instrutores.filter((item) => item.nm_instrutor);
    const resultado = notNullInstrutores.map((instrutor) => ({
        nome: instrutor.nm_instrutor,
        foto: instrutor.foto_perfil,
        especializacoes: instrutor.especializacoes
            .map((e) => e.especializacao.nm_especializacao)
            .sort()
            .join("; "),
    }));
    return resultado;
}
async function findInstrutorById(id_instrutor) {
    const resultado = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            id_instrutor: id_instrutor,
        },
        select: {
            nm_instrutor: true,
            email_instrutor: true,
            cel_instrutor: true,
            cref_instrutor: true,
            nascimento_instrutor: true,
            foto_perfil: true,
            cpf_instrutor: true,
        },
    });
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
