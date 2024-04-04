/* eslint-disable no-useless-catch */
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatters";
const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    };
    // gọi tới modle để handle lưu bản ghi newCard vào trong database
    const createdCard = await cardModel.createNew(newCard);

    // lấy bản ghi card
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    if (getNewCard) {
      // cập nhật mảng cardOrderIds trong collection columns
      await columnModel.pushCardOrderIds(getNewCard);
    }

    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
