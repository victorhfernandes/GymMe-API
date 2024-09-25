"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.all("*", async function noExistingRoutesController(request, response, next) {
    const err = new CustomError_1.default(`Rota ${request.originalUrl} não existe no servidor!`, 404);
    next(err);
});
exports.default = router;
