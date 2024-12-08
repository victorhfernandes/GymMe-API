"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstrutor = createInstrutor;
exports.createInstrutorCompleto = createInstrutorCompleto;
exports.findInstrutores = findInstrutores;
exports.findInstrutorById = findInstrutorById;
exports.findInstrutorByIdCompleto = findInstrutorByIdCompleto;
exports.findInstrutorByIdCompletoForm = findInstrutorByIdCompletoForm;
exports.findLoginInstrutor = findLoginInstrutor;
exports.findInstrutorByEmail = findInstrutorByEmail;
exports.findServicosInstrutorByStatus = findServicosInstrutorByStatus;
exports.updateServicoStatus = updateServicoStatus;
exports.findPlanilhas = findPlanilhas;
exports.createPlanilha = createPlanilha;
exports.createTreino = createTreino;
exports.findEspecializacoes = findEspecializacoes;
exports.findGrupoMuscular = findGrupoMuscular;
exports.findCertificacao = findCertificacao;
exports.findCidade = findCidade;
exports.findExperiencia = findExperiencia;
exports.eraseTreino = eraseTreino;
exports.erasePlanilha = erasePlanilha;
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
async function createInstrutorCompleto(nm_instrutor, celular_instrutor, nascimento_instrutor, especializacoes, certificacoes, experiencias, cidades, foto_perfil, cpf_instrutor, id) {
    const resultado = await prisma_util_1.prisma.instrutor.update({
        where: {
            id_instrutor: id,
        },
        data: {
            nm_instrutor: nm_instrutor,
            celular_instrutor: celular_instrutor,
            nascimento_instrutor: nascimento_instrutor,
            foto_perfil: foto_perfil,
            cpf_instrutor: cpf_instrutor,
        },
    });
    await prisma_util_1.prisma.instrutorEspecializacao.deleteMany({
        where: {
            id_instrutor: id,
        },
    });
    especializacoes.map(async (item) => {
        await prisma_util_1.prisma.instrutorEspecializacao.create({
            data: {
                id_instrutor: id,
                id_especializacao: item.value,
            },
        });
    });
    await prisma_util_1.prisma.instrutorCertificacao.deleteMany({
        where: {
            id_instrutor: id,
        },
    });
    certificacoes.map(async (item) => {
        await prisma_util_1.prisma.instrutorCertificacao.create({
            data: {
                id_instrutor: id,
                id_certificacao: item.value,
            },
        });
    });
    await prisma_util_1.prisma.instrutorExperiencia.deleteMany({
        where: {
            id_instrutor: id,
        },
    });
    experiencias.map(async (item) => {
        await prisma_util_1.prisma.instrutorExperiencia.create({
            data: {
                id_instrutor: id,
                id_experiencia: item.value,
            },
        });
    });
    await prisma_util_1.prisma.instrutorCidade.deleteMany({
        where: {
            id_instrutor: id,
        },
    });
    cidades.map(async (item) => {
        const resultado = await prisma_util_1.prisma.instrutorCidade.create({
            data: {
                id_instrutor: id,
                id_cidade: item.value,
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
                id_instrutor: true,
                nm_instrutor: true,
                foto_perfil: true,
                intro_instrutor: true,
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
                id_instrutor: true,
                nm_instrutor: true,
                foto_perfil: true,
                intro_instrutor: true,
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
        id: instrutor.id_instrutor,
        nome: instrutor.nm_instrutor,
        foto: instrutor.foto_perfil,
        introducao: instrutor.intro_instrutor,
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
            id_instrutor: true,
            nm_instrutor: true,
            email_instrutor: true,
            celular_instrutor: true,
            cref_instrutor: true,
            nascimento_instrutor: true,
            foto_perfil: true,
            cpf_instrutor: true,
        },
    });
    return resultado;
}
async function findInstrutorByIdCompleto(id_instrutor) {
    const instructorDetails = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            id_instrutor: id_instrutor,
        },
        include: {
            tb_instrutorcertificacao: {
                include: {
                    tb_certificacao: true,
                },
            },
            tb_instrutorexperiencia: {
                include: {
                    tb_experiencia: true,
                },
            },
            especializacoes: {
                include: {
                    especializacao: true,
                },
            },
            tb_link: {
                include: {
                    tb_tipo: true,
                },
            },
            tb_instrutorcidade: {
                include: {
                    tb_cidade: true,
                },
            },
        },
    });
    if (!instructorDetails) {
        throw new Error("Instrutor não encontrado!");
    }
    const especializacoes = [
        ...new Set(instructorDetails.especializacoes.map((especializacao) => especializacao.especializacao.nm_especializacao)),
    ];
    const certificacoes = [
        ...new Set(instructorDetails.tb_instrutorcertificacao.map((certificacao) => certificacao.tb_certificacao.nm_certificacao)),
    ];
    const experiencias = [
        ...new Set(instructorDetails.tb_instrutorexperiencia.map((experiencia) => experiencia.tb_experiencia.nm_experiencia)),
    ];
    const links = [
        ...new Set(instructorDetails.tb_link.map((link) => `${link.tb_tipo.nm_tipo}, ${link.nm_link}`)),
    ];
    const cidades = [
        ...new Set(instructorDetails.tb_instrutorcidade.map((cidade) => cidade.tb_cidade.nm_cidade)),
    ];
    const notaMedia = await prisma_util_1.prisma.servico.aggregate({
        _avg: {
            nota: true,
        },
        where: {
            id_instrutor: id_instrutor,
        },
    });
    return {
        id_instrutor: instructorDetails.id_instrutor,
        created_at: instructorDetails.created_at,
        intro_instrutor: instructorDetails.intro_instrutor,
        nm_instrutor: instructorDetails.nm_instrutor,
        email_instrutor: instructorDetails.email_instrutor,
        celular_instrutor: instructorDetails.celular_instrutor,
        cref_instrutor: instructorDetails.cref_instrutor,
        cpf_instrutor: instructorDetails.cpf_instrutor,
        foto_perfil: instructorDetails.foto_perfil,
        notaMedia: notaMedia._avg.nota,
        especializacoes,
        certificacoes,
        experiencias,
        links,
        cidades,
    };
}
async function findInstrutorByIdCompletoForm(id_instrutor) {
    const instructorDetails = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            id_instrutor: id_instrutor,
        },
        include: {
            tb_instrutorcertificacao: {
                include: {
                    tb_certificacao: true,
                },
            },
            tb_instrutorexperiencia: {
                include: {
                    tb_experiencia: true,
                },
            },
            especializacoes: {
                include: {
                    especializacao: true,
                },
            },
            tb_link: {
                include: {
                    tb_tipo: true,
                },
            },
            tb_instrutorcidade: {
                include: {
                    tb_cidade: true,
                },
            },
        },
    });
    if (!instructorDetails) {
        throw new Error("Instrutor não encontrado!");
    }
    const especializacoes = [
        ...new Set(instructorDetails.especializacoes.map((especializacao) => {
            return {
                value: especializacao.especializacao.id_especializacao,
                label: especializacao.especializacao.nm_especializacao,
            };
        })),
    ];
    const certificacoes = [
        ...new Set(instructorDetails.tb_instrutorcertificacao.map((certificacao) => {
            return {
                value: certificacao.tb_certificacao.id_certificacao,
                label: certificacao.tb_certificacao.nm_certificacao,
            };
        })),
    ];
    const experiencias = [
        ...new Set(instructorDetails.tb_instrutorexperiencia.map((experiencia) => {
            return {
                value: experiencia.tb_experiencia.id_experiencia,
                label: experiencia.tb_experiencia.nm_experiencia,
            };
        })),
    ];
    const cidades = [
        ...new Set(instructorDetails.tb_instrutorcidade.map((cidade) => {
            return {
                value: cidade.tb_cidade.id_cidade,
                label: cidade.tb_cidade.nm_cidade,
            };
        })),
    ];
    const links = [
        ...new Set(instructorDetails.tb_link.map((link) => `${link.tb_tipo.nm_tipo}, ${link.nm_link}`)),
    ];
    const notaMedia = await prisma_util_1.prisma.servico.aggregate({
        _avg: {
            nota: true,
        },
        where: {
            id_instrutor: id_instrutor,
        },
    });
    return {
        id_instrutor: instructorDetails.id_instrutor,
        created_at: instructorDetails.created_at,
        nascimento_instrutor: instructorDetails.nascimento_instrutor,
        intro_instrutor: instructorDetails.intro_instrutor,
        nm_instrutor: instructorDetails.nm_instrutor,
        email_instrutor: instructorDetails.email_instrutor,
        celular_instrutor: instructorDetails.celular_instrutor,
        cref_instrutor: instructorDetails.cref_instrutor,
        cpf_instrutor: instructorDetails.cpf_instrutor,
        foto_perfil: instructorDetails.foto_perfil,
        notaMedia: notaMedia._avg.nota,
        especializacoes,
        certificacoes,
        experiencias,
        links,
        cidades,
    };
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
async function findServicosInstrutorByStatus(id, status) {
    const resultado = await prisma_util_1.prisma.servico.findMany({
        where: {
            id_instrutor: id,
            status_servico: status,
        },
        orderBy: {
            updated_at: "desc",
        },
        select: {
            tb_aluno: {
                select: {
                    id_aluno: true,
                    foto_perfil: true,
                    nm_aluno: true,
                },
            },
            status_pagamento: true,
            id_servico: true,
        },
    });
    const formattedResult = resultado.map((item) => {
        const aluno = item.tb_aluno;
        return {
            id_aluno: aluno.id_aluno,
            foto_perfil: aluno.foto_perfil,
            nm_aluno: aluno.nm_aluno,
            status_pagamento: item.status_pagamento,
            id_servico: item.id_servico,
        };
    });
    return formattedResult;
}
async function updateServicoStatus(idInstrutor, idAluno, statusServico, statusPagamento) {
    const resultado = await prisma_util_1.prisma.servico.updateMany({
        where: {
            id_instrutor: idInstrutor,
            id_aluno: idAluno,
        },
        data: {
            status_servico: statusServico,
            status_pagamento: statusPagamento,
        },
    });
    return resultado.count === 1;
}
async function findPlanilhas(idInstrutor, idAluno) {
    const resultado = await prisma_util_1.prisma.planilha.findMany({
        where: {
            tb_servico: {
                id_aluno: idAluno,
                id_instrutor: idInstrutor,
            },
        },
        include: {
            tb_treino: {
                include: {
                    tb_grupomuscular: true,
                },
            },
        },
    });
    // Transform the result to match the structure of your SQL query
    if (resultado) {
        const organizados = resultado.reduce((accumulator, item) => {
            if (item.id_planilha && item.nm_planilha && accumulator) {
                if (!accumulator[item.id_planilha - 1]) {
                    accumulator[item.id_planilha - 1] = {
                        id_planilha: item.id_planilha,
                        nm_planilha: item.nm_planilha,
                        id_servico: item.id_servico,
                        treinos: [],
                    };
                }
                item.tb_treino.map((item2) => {
                    const treino = {
                        id_treino: item2.id_treino,
                        nm_exercicio: item2.nm_exercicio,
                        id_grupoMuscular: item2.id_grupoMuscular,
                        id_planilha: item2.id_planilha,
                        nm_grupoMuscular: item2.tb_grupomuscular?.nm_grupoMuscular,
                        ds_treino: item2.ds_treino,
                        qt_treino: item2.qt_treino,
                        qt_serie: item2.qt_serie,
                        kg_carga: item2.kg_carga,
                        sg_descanso: item2.sg_descanso,
                        gif_exercicio: item2.gif_exercicio,
                    };
                    accumulator[item.id_planilha - 1].treinos.push(treino);
                });
            }
            return accumulator;
        }, []);
        const filteredData = organizados.filter((item) => item !== null);
        return filteredData;
    }
}
async function createPlanilha(nm_planilha, id_servico) {
    const resultado = await prisma_util_1.prisma.planilha.create({
        data: {
            nm_planilha: nm_planilha,
            id_servico: id_servico,
        },
    });
    return resultado;
}
async function createTreino(nm_exercicio, id_grupoMuscular, id_planilha, qt_treino, qt_serie, kg_carga, ds_treino, gif_exercicio) {
    const resultado = await prisma_util_1.prisma.treino.create({
        data: {
            nm_exercicio: nm_exercicio,
            id_grupoMuscular: id_grupoMuscular,
            id_planilha: id_planilha,
            qt_treino: qt_treino,
            qt_serie: qt_serie,
            kg_carga: kg_carga,
            ds_treino: ds_treino,
            gif_exercicio: gif_exercicio,
        },
    });
    return resultado;
}
async function findEspecializacoes() {
    const resultado = await prisma_util_1.prisma.especializacao.findMany();
    return resultado;
}
async function findGrupoMuscular() {
    const resultado = await prisma_util_1.prisma.grupoMuscular.findMany();
    return resultado;
}
async function findCertificacao() {
    const resultado = await prisma_util_1.prisma.certificacao.findMany();
    return resultado;
}
async function findCidade() {
    const resultado = await prisma_util_1.prisma.cidade.findMany();
    return resultado;
}
async function findExperiencia() {
    const resultado = await prisma_util_1.prisma.experiencia.findMany();
    return resultado;
}
async function eraseTreino(id_treino) {
    const resultado = await prisma_util_1.prisma.treino.delete({
        where: {
            id_treino: id_treino,
        },
    });
    return resultado;
}
async function erasePlanilha(id_planilha) {
    const resultado = await prisma_util_1.prisma.planilha.delete({
        where: {
            id_planilha: id_planilha,
        },
    });
    return resultado;
}
