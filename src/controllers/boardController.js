import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    console.log(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "POST from controller: API create new board" });
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardController = {
  createNew,
};
