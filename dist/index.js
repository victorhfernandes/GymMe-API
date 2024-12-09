"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const prisma_util_1 = require("./utils/prisma.util");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const invalidRouteHandler_1 = __importDefault(require("./middlewares/invalidRouteHandler"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
require("./strategies/aluno.strategy");
require("./strategies/instrutor.strategy");
const secret = process.env.SESSION_SECRET;
const origin = process.env.ORIGIN;
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: `${secret}`,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
    store: new prisma_session_store_1.PrismaSessionStore(prisma_util_1.prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true,
}));
app.use("/api", index_router_1.default);
app.use("/", invalidRouteHandler_1.default);
app.use(globalErrorHandler_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
