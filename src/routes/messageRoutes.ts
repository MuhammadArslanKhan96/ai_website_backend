import express from "express";
import * as messageController from "../controllers/messageController";

const router = express.Router();

router.get("/read/:id", messageController.readMessage);
router.delete("/delete/:id", messageController.deleteMessage);
router.get("/:userid", messageController.getAllMessages);
router.post("/create", messageController.createMessage);

export default router;
