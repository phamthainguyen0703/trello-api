import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // điều hướng data sáng service
    const createdBoard = await boardService.createNew(req.body);

    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const updatedBoard = await boardService.update(boardId, req.body);

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
};
