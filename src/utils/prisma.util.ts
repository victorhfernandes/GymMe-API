import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect(); // Ensure disconnection after testing
  }
}

checkDatabaseConnection();
