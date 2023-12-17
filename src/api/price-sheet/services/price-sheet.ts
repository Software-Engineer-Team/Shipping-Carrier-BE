/**
 * price-sheet service
 */

import { factories } from "@strapi/strapi";
import { validatePriceItems } from "./utils";
import {
  PRICE_SHEET_ROUTE,
  USER_PRICE_SHEET_ROUTE,
} from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreService(PRICE_SHEET_ROUTE, {
  async findPriceSheetById(priceSheetId: number) {
    const priceSheet = await strapi.entityService.findOne(
      PRICE_SHEET_ROUTE,
      priceSheetId,
      {
        populate: {
          price_items: {
            populate: {
              carrier_account: {
                fields: ["id", "account_name"],
              },
              zone_pick: true,
            },
          },
          carrier: true,
        },
      },
    );

    if (!priceSheet) {
      throw new NotFoundError("Không tìm thấy bảng giá.");
    }
    return priceSheet;
  },

  async findPriceSheetByName(priceSheetName: string) {
    const priceSheet = await strapi.db.query(PRICE_SHEET_ROUTE).findOne({
      where: {
        name: priceSheetName,
      },
      populate: [
        "price_items",
        "price_items.carrier_account",
        "price_items.zone_pick",
        "carrier",
      ],
    });

    if (priceSheet) {
      throw new ApplicationError("Bảng giá đã tồn tại.");
    }
    return priceSheet;
  },

  async createPriceSheet(data: any) {
    const { isValid, errors, new_price_items } = await validatePriceItems(
      data.price_items,
    );
    if (!isValid) {
      throw new ApplicationError(errors);
    }
    const exsitedPriceSheet = await strapi
      .service(PRICE_SHEET_ROUTE)
      .findPriceSheetByName(data.name);

    const price_sheet = await strapi.entityService.create(PRICE_SHEET_ROUTE, {
      data: {
        ...data,
        price_items: new_price_items,
      },
      populate: ["price_items", "carrier", "price_items.zone_pick"],
    });
    return price_sheet;
  },

  async updatePriceSheet(priceSheetId: number, data: any) {
    const { isValid, errors, new_price_items } = await validatePriceItems(
      data.price_items,
      true,
    );
    if (!isValid) {
      throw new ApplicationError(errors);
    }

    const price_sheet = await strapi.entityService.update(
      PRICE_SHEET_ROUTE,
      priceSheetId,
      {
        data: {
          ...data,
          price_items: new_price_items,
        },
        // populate: ["price_items", "carrier", "price_items.zone_pick"],
        populate: ["carrier", "price_items.zone_pick"],
      },
    );
    return price_sheet;
  },

  async deletePriceSheet(priceSheetId: number) {
    const logger = new Logger("deletePriceSheet").getLogger();
    const priceSheet = await strapi
      .service(PRICE_SHEET_ROUTE)
      .findPriceSheetById(priceSheetId);
    if (priceSheet.default === true) {
      throw new ApplicationError("Không thể xóa bảng giá mặc định.");
    }
    const deleted_user_price_sheets = await strapi
      .service(USER_PRICE_SHEET_ROUTE)
      .deleteUserPriceSheetsByPriceSheetId(priceSheetId);
    logger.debug("deleted_user_price_sheets: ", deleted_user_price_sheets);

    const deleted_price_sheet = await strapi.db
      .query(PRICE_SHEET_ROUTE)
      .update({
        where: {
          $and: [
            {
              id: priceSheetId,
            },
            {
              deleted: true,
            },
          ],
        },
      });

    logger.debug("deleted_price_sheet: ", deleted_price_sheet);

    return deleted_price_sheet;
  },
});
