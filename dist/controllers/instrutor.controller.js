"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInstrutor = exports.getInstrutorById = exports.getInstrutor = void 0;
const instrutor_model_1 = require("../models/instrutor.model");
const getInstrutor = async (request, response) => {
    const getInstrutor = await (0, instrutor_model_1.findInstrutor)();
    return response.json(getInstrutor);
};
exports.getInstrutor = getInstrutor;
const getInstrutorById = async (request, response) => {
    const getInstrutorById = await (0, instrutor_model_1.findInstrutorById)(parseInt(request.params.id));
    return response.json(getInstrutorById);
};
exports.getInstrutorById = getInstrutorById;
const postInstrutor = async (request, response) => {
    const postInstrutor = await (0, instrutor_model_1.createInstrutorById)(request.body);
    return response.json(postInstrutor);
};
exports.postInstrutor = postInstrutor;
