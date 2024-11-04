"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncHandler;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
function asyncHandler(func) {
    return function (request, response, next) {
        func(request, response, next).catch(function (prismaError) {
            let error = new CustomError_1.default(prismaError.message, 400);
            if (prismaError.code) {
                if (prismaError.code === "P2002") {
                    error = duplicateErrorHandler(prismaError);
                }
            }
            next(error);
        });
    };
}
function duplicateErrorHandler(error) {
    let msg;
    if (error.meta) {
        const attr = String(error.meta.target).includes("email")
            ? "Email"
            : String(error.meta.target);
        msg = `${attr} já cadastrado!`;
    }
    else {
        msg = "Bad Request";
    }
    return new CustomError_1.default(msg, 400);
}
