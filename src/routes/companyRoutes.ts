import express from "express";
import * as companyController from "../controllers/companyController";

const router = express.Router();

router.get("/read/:id", companyController.readCompany);
router.put("/update/:id", companyController.updateCompany);
router.delete("/delete/:id", companyController.deleteCompany);
router.get("/getAll", companyController.getAllCompanies);
router.post("/signup", companyController.signupCompany);
router.post("/signin", companyController.signinCompany);

export default router;
