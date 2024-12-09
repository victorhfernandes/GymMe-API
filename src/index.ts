import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./utils/prisma.util";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.router";
import invalidRouteHandler from "./middlewares/invalidRouteHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import "./strategies/aluno.strategy";
import "./strategies/instrutor.strategy";
const secret = process.env.SESSION_SECRET;
const origin = process.env.ORIGIN;

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: `${secret}`,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60000 * 60,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use("/api", routes);
app.use("/", invalidRouteHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
