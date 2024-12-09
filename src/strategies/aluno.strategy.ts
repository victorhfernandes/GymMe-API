import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { prisma } from "../utils/prisma.util";

interface Aluno {
  id?: number;
}

passport.serializeUser((user: Aluno, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const findAluno = await prisma.aluno.findUnique({
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
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  "aluno-local",
  new Strategy(
    { usernameField: "email_aluno", passwordField: "senha_aluno" },
    async (email: string, password: string, done) => {
      try {
        const findAluno = await prisma.aluno.findUnique({
          where: {
            email_aluno: email,
          },
          select: {
            id_aluno: true,
            senha_aluno: true,
          },
        });
        if (!findAluno) throw new Error("Aluno não encontrado!");
        const isValid = await bcrypt.compare(password, findAluno.senha_aluno);
        if (!isValid) throw new Error("Credenciais invalidas!");
        const Aluno = {
          id: findAluno.id_aluno,
        };
        done(null, Aluno);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
