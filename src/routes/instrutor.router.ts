import { Router } from "express";
import {
  getInstrutor,
  getInstrutorById,
  postInstrutor,
} from "../controllers/instrutor.controller";

const router = Router();

router.get("/", getInstrutor);
router.get("/:id", getInstrutorById);
router.post("/", postInstrutor);

export default router;
