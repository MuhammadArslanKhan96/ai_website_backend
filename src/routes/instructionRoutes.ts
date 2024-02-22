import express from "express";
import * as instructionsController from "../controllers/instructionController";

const router = express.Router();

router.get("/read/:id", instructionsController.readInstruction);
router.delete("/delete/:id", instructionsController.deleteInstruction);
router.get("/:userid", instructionsController.getAllInstructions);
router.post("/create", instructionsController.createInstruction);

export default router;
