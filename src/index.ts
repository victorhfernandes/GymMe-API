import express from "express";
import cors from "cors";
import routes from "./routes/index.router";
import globalErrorHandler from "./controllers/error.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
