import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    };
    // gọi tới model để handle lưu bản ghi newColumn vào trong database
    const createdColumn = await columnModel.createNew(newColumn);

    // lấy bản ghi column
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      // xử lí cấu trúc data trc khi trả data về
      getNewColumn.cards = [];

      // cập nhật mảng cardOrderIds trong collection columns
      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedColum = await columnModel.update(columnId, updateData);
    return updatedColum;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId);
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
    }
    // xóa column
    await columnModel.deleteOneById(columnId);

    // xóa cards thuộc column bị xóa
    await cardModel.deleteManyByCColumnId(columnId);

    // xóa columnId trong mảng ColumnOrderIds của board chứa
    await boardModel.pullColumnOrderIds(targetColumn);

    return { deleteResult: "Column and its Cards deleted successfully" };
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  update,
  deleteItem,
};
