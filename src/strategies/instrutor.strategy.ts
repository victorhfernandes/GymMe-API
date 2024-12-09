import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { prisma } from "../utils/prisma.util";

interface Instrutor {
  id?: number;
}

passport.serializeUser((user: Instrutor, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const findInstrutor = await prisma.instrutor.findUnique({
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
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  "instrutor-local",
  new Strategy(
    { usernameField: "email_instrutor", passwordField: "senha_instrutor" },
    async (email: string, password: string, done) => {
      try {
        const findInstrutor = await prisma.instrutor.findUnique({
          where: {
            email_instrutor: email,
          },
          select: {
            id_instrutor: true,
            senha_instrutor: true,
          },
        });
        if (!findInstrutor) throw new Error("Instrutor não encontrado!");
        const isValid = await bcrypt.compare(
          password,
          findInstrutor.senha_instrutor
        );
        if (!isValid) throw new Error("Credenciais invalidas!");
        const Instrutor = {
          id: findInstrutor.id_instrutor,
        };
        done(null, Instrutor);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
