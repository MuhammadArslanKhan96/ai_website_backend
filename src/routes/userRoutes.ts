import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/read/:id", userController.readUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUsers);
router.post("/signup", userController.signupUser);
router.post("/signin", userController.signinUser);

export default router;
