/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cloneDeep } from "lodash";
import { date } from "joi";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";
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
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      );
    });

    //B3: xóa mảng cards khỏi board ban đầu
    delete resBoard.cards;
    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedData = await boardModel.update(boardId, updateData);
    return updatedData;
  } catch (error) {
    throw error;
  }
};

const moveCardToDifferentColumns = async (reqBody) => {
  try {
    // b1: cập nhật mảng cardOrderIds của column đang chứa (xóa _id card khỏi mảng)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });
    // b2: cập nhật mảng cardOrderIds của column mới tiếp theo (thêm _id vào mảng)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });
    // b3: cập nhật lại trường columnId mới của card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
    });

    return { updateResult: "Successfully" };
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumns,
};
