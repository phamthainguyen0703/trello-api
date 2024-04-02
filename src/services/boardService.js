/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import { slugify } from "~/utils/formatters";
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    // gọi tới modle để handle lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard);
    console.log("createdBoard", createdBoard);

    // lấy bản ghi board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    console.log(getNewBoard);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
