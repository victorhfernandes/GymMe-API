import express from "express";
import cors from "cors";
import routes from "./routes/index.router";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
