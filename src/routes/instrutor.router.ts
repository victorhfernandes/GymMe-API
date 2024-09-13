import { Router } from "express";
import {
  getInstrutor,
  getInstrutorById,
  postInstrutor,
} from "../controllers/instrutor.controller";
import asyncHandler from "../utils/asyncErrorHandler";

const router = Router();

router.get("/", asyncHandler(getInstrutor));
router.get("/:id", asyncHandler(getInstrutorById));
router.post("/", asyncHandler(postInstrutor));

export default router;
