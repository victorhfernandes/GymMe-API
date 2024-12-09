"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = require("passport-local");
const prisma_util_1 = require("../utils/prisma.util");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const findInstrutor = await prisma_util_1.prisma.instrutor.findUnique({
            where: {
                id_instrutor: id,
            },
            select: {
                id_instrutor: true,
                senha_instrutor: true,
            },
        });
        const Instrutor = {
            id: findInstrutor?.id_instrutor,
        };
        done(null, Instrutor);
    }
    catch (err) {
        done(err, null);
    }
});
exports.default = passport_1.default.use("instrutor-local", new passport_local_1.Strategy({ usernameField: "email_instrutor", passwordField: "senha_instrutor" }, async (email, password, done) => {
    try {
        const findInstrutor = await prisma_util_1.prisma.instrutor.findUnique({
            where: {
                email_instrutor: email,
            },
            select: {
                id_instrutor: true,
                senha_instrutor: true,
            },
        });
        if (!findInstrutor)
            throw new Error("Instrutor não encontrado!");
        const isValid = await bcrypt_1.default.compare(password, findInstrutor.senha_instrutor);
        if (!isValid)
            throw new Error("Credenciais invalidas!");
        const Instrutor = {
            id: findInstrutor.id_instrutor,
        };
        done(null, Instrutor);
    }
    catch (err) {
        done(err, false);
    }
}));
