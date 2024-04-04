import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { cardService } from "~/services/cardService";

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // điều hướng data sáng service
    const createdCard = await cardService.createNew(req.body);

    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdCard);
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const cardController = {
  createNew,
};
