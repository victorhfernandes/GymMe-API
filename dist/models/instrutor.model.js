"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstrutorById = exports.findInstrutorById = exports.findInstrutor = void 0;
const prisma_util_1 = require("../utils/prisma.util");
const findInstrutor = async () => {
    const instrutor = await prisma_util_1.prisma.instrutor.findMany();
    return instrutor;
};
exports.findInstrutor = findInstrutor;
const findInstrutorById = async (id) => {
    const instrutor = await prisma_util_1.prisma.instrutor.findUnique({
        where: {
            id_instrutor: id,
        },
    });
    return instrutor;
};
exports.findInstrutorById = findInstrutorById;
const createInstrutorById = async (body) => {
    const createInstrutorById = await prisma_util_1.prisma.instrutor.create({
        data: body,
    });
    return createInstrutorById;
};
exports.createInstrutorById = createInstrutorById;
