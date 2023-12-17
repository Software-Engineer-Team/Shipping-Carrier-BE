/**
 * user-price-sheet service
 */

import { factories } from "@strapi/strapi";
import {
  PRICE_SHEET_ROUTE,
  TOTAL_USER_PRICE_SHEET,
  USER_PRICE_SHEET_ROUTE,
} from "../../../helper/constants";
import { setQueryPriceSheet } from "./utils";
import { Logger } from "../../../helper/logger/logger";
import { findAll } from "../../../helper/apiHelper";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreService(USER_PRICE_SHEET_ROUTE, {
  async groupPriceSheetsByCustomer(ctx: any) {
    const logger = new Logger("groupPriceSheetsByCustomer").getLogger();
    const { results: priceSheets, pagination } = await findAll(
      USER_PRICE_SHEET_ROUTE,
      ctx,
      setQueryPriceSheet,
    );
    console.log(priceSheets);

    const priceSheetsByCustomer = [];
    priceSheets.forEach((priceSheet: any) => {
      const customer = priceSheet.user;
      const customerIndex = priceSheetsByCustomer.findIndex(
        (priceSheet) => priceSheet?.customer?.id === customer?.id,
      );

      if (customerIndex === -1) {
        priceSheetsByCustomer.push({
          customer,
          priceSheets: [{ ...priceSheet.price_sheet, id: priceSheet.id }],
        });
      } else {
        priceSheetsByCustomer[customerIndex]["priceSheets"].push({
          ...priceSheet.price_sheet,
          id: priceSheet.id,
        });
      }
    });
    logger.debug(`priceSheetsByCustomer: `, priceSheetsByCustomer);
    return { priceSheetsByCustomer, pagination };
  },

  async createUserPriceSheet(user_id: number, price_sheet_id: number) {
    const userPriceSheets = await strapi
      .service(USER_PRICE_SHEET_ROUTE)
      .getPriceSheetsByUserId(user_id);

    if (userPriceSheets.length < TOTAL_USER_PRICE_SHEET) {
      const priceSheet = await strapi
        .service(PRICE_SHEET_ROUTE)
        .findPriceSheetById(price_sheet_id);

      const isAssignedCarrier = userPriceSheets.some(
        (ups: any) => ups.price_sheet.carrier.id === priceSheet.carrier.id,
      );

      if (!isAssignedCarrier) {
        const userPriceSheet = await strapi.entityService.create(
          USER_PRICE_SHEET_ROUTE,
          {
            data: {
              user: user_id,
              price_sheet: price_sheet_id,
            },
          },
        );
        return userPriceSheet;
      } else {
        throw new ApplicationError("Đơn vị vận chuyển trùng lặp");
      }
    } else {
      throw new ApplicationError(
        `Chỉ được ${TOTAL_USER_PRICE_SHEET} bảng giá của đơn vị vận chuyển cho người dùng.`,
      );
    }
  },
  async updateUserPriceSheet(
    user_price_sheet_id: number,
    price_sheet_id: number,
  ) {
    const userPriceSheet = await strapi.entityService.findOne(
      USER_PRICE_SHEET_ROUTE,
      user_price_sheet_id,
      {
        populate: {
          price_sheet: {
            populate: {
              carrier: true,
            },
          },
        },
      },
    );
    if (!userPriceSheet) {
      throw new NotFoundError("Không tìm thấy bảng giá của người dùng.");
    }

    const newPriceSheet = await strapi.entityService.findOne(
      PRICE_SHEET_ROUTE,
      price_sheet_id,
      {
        populate: { carrier: true },
      },
    );

    if (!newPriceSheet) {
      throw new NotFoundError("Không tìm thấy bảng giá mới.");
    }

    const isCorrectCarrier =
      userPriceSheet.price_sheet.carrier.id === newPriceSheet.carrier.id;

    if (isCorrectCarrier) {
      const updatedEntry = await strapi.entityService.update(
        USER_PRICE_SHEET_ROUTE,
        user_price_sheet_id,
        {
          data: {
            price_sheet: price_sheet_id,
          },
        },
      );

      return updatedEntry;
    } else {
      throw new ApplicationError(
        "Đơn vị vận chuyển của bảng giá mới không tương thích với bảng giá cũ",
      );
    }
  },

  async getPriceSheetsByUserId(userId: number) {
    const priceSheets = await strapi.entityService.findMany(
      USER_PRICE_SHEET_ROUTE,
      {
        filters: { user: userId },
        populate: {
          price_sheet: {
            populate: {
              carrier: {
                fields: ["name"],
              },
              price_items: {
                populate: {
                  carrier_account: true,
                  zone_pick: true,
                },
              },
            },
          },
        },
      },
    );
    return priceSheets;
  },

  async deleteUserPriceSheetsByPriceSheetId(priceSheetId: number) {
    const deletedUserPriceSheets = await strapi.db
      .query(USER_PRICE_SHEET_ROUTE)
      .findMany({
        where: {
          $and: [
            {
              price_sheet: priceSheetId,
            },
            {
              price_sheet: {
                default: false,
              },
            },
          ],
        },
      });

    return await strapi.db.query(USER_PRICE_SHEET_ROUTE).deleteMany({
      where: {
        id: deletedUserPriceSheets.map(({ id }) => id),
      },
    });
  },

  async getPriceSheetByUserIdAndCarrier(userId: number, carrier: string) {
    return await strapi.query(USER_PRICE_SHEET_ROUTE).findOne({
      where: {
        $and: [
          {
            user: userId,
          },
          {
            price_sheet: {
              carrier: {
                name: {
                  $eq: carrier,
                },
              },
            },
          },
        ],
      },
      populate: {
        user: {
          populate: {
            sale: true,
          },
        },
        price_sheet: {
          populate: {
            carrier: true,
            price_items: {
              populate: {
                carrier_account: true,
                zone_pick: true,
              },
            },
          },
        },
      },
    });
  },
});
