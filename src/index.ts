import express from "express";
import cors from "cors";
import instrutorRouter from "./routes/instrutor.router";
import alunoRouter from "./routes/aluno.router";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/instrutor", instrutorRouter);
app.use("/api/aluno", alunoRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
