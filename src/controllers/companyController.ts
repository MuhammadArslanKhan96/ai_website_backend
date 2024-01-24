import express from "express";
import * as Company from "../models/Company";
import { successMessage, errorMessage, handleGetAllResponse, handleError } from "../helper/Responses";
import { handleReadResponse, handleUpdateResponse, handleDeleteResponse } from "../helper/Responses";

export const readCompany = async (req: express.Request, res: express.Response) => {
  try {
    const company = await Company.readCompany(parseInt(req.params.id));
    handleReadResponse(res, company, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateCompany = async (req: express.Request, res: express.Response) => {
  try {
    const company = await Company.updateCompany(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, company, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteCompany = async (req: express.Request, res: express.Response) => {
  try {
    const deletedCount = await Company.deleteCompany(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount ?? 0, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllCompanies = async (_req: express.Request, res: express.Response) => {
  try {
    const allCompanies = await Company.getAllCompanies();
    handleGetAllResponse(res, allCompanies, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const signupCompany = async (req: express.Request, res: express.Response) => {
  try {
    const company = await Company.signupCompany(req.body);
    res.status(201).send({ message: "Company signed up successfully", data: company });
  } catch (err) {
    handleError(err, res);
  }
};

export const signinCompany = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const company = await Company.signinCompany(email, password);
    if (company) {
      res.status(200).send({ message: "Company signed in successfully", data: company });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};
