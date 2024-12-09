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
        const findAluno = await prisma_util_1.prisma.aluno.findUnique({
            where: {
                id_aluno: id,
            },
            select: {
                id_aluno: true,
                senha_aluno: true,
            },
        });
        const Aluno = {
            id: findAluno?.id_aluno,
        };
        done(null, Aluno);
    }
    catch (err) {
        done(err, null);
    }
});
exports.default = passport_1.default.use("aluno-local", new passport_local_1.Strategy({ usernameField: "email_aluno", passwordField: "senha_aluno" }, async (email, password, done) => {
    try {
        const findAluno = await prisma_util_1.prisma.aluno.findUnique({
            where: {
                email_aluno: email,
            },
            select: {
                id_aluno: true,
                senha_aluno: true,
            },
        });
        if (!findAluno)
            throw new Error("Aluno não encontrado!");
        const isValid = await bcrypt_1.default.compare(password, findAluno.senha_aluno);
        if (!isValid)
            throw new Error("Credenciais invalidas!");
        const Aluno = {
            id: findAluno.id_aluno,
        };
        done(null, Aluno);
    }
    catch (err) {
        done(err, false);
    }
}));
