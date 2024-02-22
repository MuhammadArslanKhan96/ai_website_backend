import express from "express";
import * as Instruction from "../models/Instruction";
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

export const readInstruction = async (req: express.Request, res: express.Response) => {
    try {
        const instruction = await Instruction.readInstruction(parseInt(req.params.id));
        handleReadResponse(res, instruction, successMessage, errorMessage);
    } catch (err) {
        handleError(err, res);
    }
};

export const deleteInstruction = async (req: express.Request, res: express.Response) => {
    try {
        const deletedCount = await Instruction.deleteInstruction(parseInt(req.params.id));
        handleDeleteResponse(res, deletedCount ?? 0, successMessage, errorMessage);
    } catch (err) {
        handleError(err, res);
    }
};

export const getAllInstructions = async (req: express.Request, res: express.Response) => {
    try {
        const allMessages = await Instruction.getAllInstructions(parseInt(req.params.userid));
        handleGetAllResponse(res, allMessages, successMessage, errorMessage);
    } catch (err) {
        handleError(err, res);
    }
};

export const createInstruction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allMessages = await Instruction.createInstruction(req.body);
    handleGetAllResponse(res, allMessages, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};