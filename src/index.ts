import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.router";
import invalidRouteHandler from "./middlewares/invalidRouteHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);
app.use("/", invalidRouteHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
