import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";

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

export const columnService = {
  createNew,
};
