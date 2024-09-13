import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

checkDatabaseConnection();

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao base de dados:", error);
  } finally {
    await prisma.$disconnect(); // Ensure disconnection after testing
  }
}
