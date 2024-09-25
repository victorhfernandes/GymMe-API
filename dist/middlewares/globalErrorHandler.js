"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(error, request, response, next) {
    error.statusCode = error.statusCode || 500;
    if (process.env.DEV_ENV)
        logError(error);
    resError(response, error);
}
function logError(error) {
    const objError = {
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    };
    console.error(objError);
}
function resError(response, error) {
    if (error.isOperational) {
        response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }
    else {
        response.status(500).json({
            status: 500,
            message: "Something went wrong! Please try again later.",
        });
    }
}
