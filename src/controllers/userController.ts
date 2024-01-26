import express from "express";
import * as User from "../models/User";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const readUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.readUser(parseInt(req.params.id));
    handleReadResponse(res, user, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await User.updateUser(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, user, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await User.deleteUser(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount ?? 0, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allUsers = await User.getAllUsers();
    handleGetAllResponse(res, allUsers, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const signupUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log(req.body);
    const user = await User.signupUser(req.body);
    res
      .status(201)
      .send({ message: "User signed up successfully", data: user });
  } catch (err) {
    handleError(err, res);
  }
};

export const signinUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.signinUser(email, password);
    if (user) {
      res
        .status(200)
        .send({ message: "User signed in successfully", data: user });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};
