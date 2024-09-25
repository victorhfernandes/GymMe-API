"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
checkDatabaseConnection();
async function checkDatabaseConnection() {
    try {
        await exports.prisma.$connect();
        console.log("Banco de dados conectado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao conectar ao base de dados:", error);
    }
    finally {
        await exports.prisma.$disconnect(); // Ensure disconnection after testing
    }
}
