import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { columnService } from "~/services/columnService";

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // điều hướng data sáng service
    const createdColumn = await columnService.createNew(req.body);

    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdColumn);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedBColumn = await columnService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(updatedBColumn);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const result = await columnService.deleteItem(columnId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const columnController = {
  createNew,
  update,
  deleteItem,
};
