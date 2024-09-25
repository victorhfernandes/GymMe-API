"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const invalidRouteHandler_1 = __importDefault(require("./middlewares/invalidRouteHandler"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api", index_router_1.default);
app.use("/", invalidRouteHandler_1.default);
app.use(globalErrorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
