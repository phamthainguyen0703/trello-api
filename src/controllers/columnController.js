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

export const columnController = {
  createNew,
};
