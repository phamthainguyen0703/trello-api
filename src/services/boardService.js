/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cloneDeep } from "lodash";
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    // gọi tới modle để handle lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard);

    // lấy bản ghi board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    //B1: deepclone board ra 1 cái mới để xử lí kh ảnh hưởng tới board ban đầu
    const resBoard = cloneDeep(board);

    //B2: đưa card về đúng column của nó
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    //B3: xóa mảng cards khỏi board ban đầu
    delete resBoard.cards;
    return resBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
