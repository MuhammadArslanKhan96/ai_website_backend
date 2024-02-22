import express from "express";
import * as Message from "../models/Message";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleReadResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const readMessage = async (req: express.Request, res: express.Response) => {
  try {
    const message = await Message.readMessage(parseInt(req.params.id));
    handleReadResponse(res, message, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteMessage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Message.deleteMessage(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount ?? 0, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllMessages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allMessages = await Message.getAllMessages(parseInt(req.params.userid));
    handleGetAllResponse(res, allMessages, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const createMessage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allMessages = await Message.createMessage(req.body);
    handleGetAllResponse(res, allMessages, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};