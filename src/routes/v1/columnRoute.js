import express from "express";
import { StatusCodes } from "http-status-codes";
import { columnValidation } from "~/validations/columnValidation";
import { columnController } from "~/controllers/columnController";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "GET: API get list column" });
  })
  .post(columnValidation.createNew, columnController.createNew);

Router.route("/:id")
  .put(columnValidation.update, columnController.update)
  .delete(columnValidation.deleteItem, columnController.deleteItem);

export const columnRoute = Router;
