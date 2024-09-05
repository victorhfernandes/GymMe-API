"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instrutor_controller_1 = require("../controllers/instrutor.controller");
const router = (0, express_1.Router)();
router.get("/", instrutor_controller_1.getInstrutor);
router.get("/:id", instrutor_controller_1.getInstrutorById);
router.post("/", instrutor_controller_1.postInstrutor);
exports.default = router;
