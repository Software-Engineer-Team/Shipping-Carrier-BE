/**
 * user-price-sheet controller
 */

import { factories } from "@strapi/strapi";
import { USER_PRICE_SHEET_ROUTE } from "../../../helper/constants";
import { parseBody } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(
  USER_PRICE_SHEET_ROUTE,
  ({ strapi }) => ({
    async create(ctx) {
      const logger = new Logger("create").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Thiếu trường data.");
        }
        logger.debug("POST request data for create one userPriceSheet: ", data);
        const { user_id, price_sheet_id } = data;
        if (!user_id || !price_sheet_id) {
          return ctx.badRequest(
            !user_id && !price_sheet_id
              ? "Thiếu trường user_id và price_sheet_id."
              : "Thiếu trường user_id hoặc price_sheet_id.",
          );
        }
        const createdUserPriceSheet = await strapi
          .service(USER_PRICE_SHEET_ROUTE)
          .createUserPriceSheet(user_id, price_sheet_id);
        const sanitizedCreatedUserPriceSheet = await this.sanitizeOutput(
          createdUserPriceSheet,
          ctx,
        );
        return this.transformResponse(sanitizedCreatedUserPriceSheet);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async update(ctx) {
      const logger = new Logger("update").getLogger();
      try {
        const { id } = ctx.params;
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Thiếu trường data.");
        }
        logger.debug("PUT request data for update one userPriceSheet: ", data);
        const { price_sheet_id } = data;
        if (!price_sheet_id) {
          return ctx.badRequest("Thiếu trường price_sheet_id.");
        }
        const updatedUserPriceSheet = await strapi
          .service(USER_PRICE_SHEET_ROUTE)
          .updateUserPriceSheet(id, price_sheet_id);
        const sanitizedUpdatedUserPriceSheet = await this.sanitizeOutput(
          updatedUserPriceSheet,
          ctx,
        );
        return this.transformResponse(sanitizedUpdatedUserPriceSheet);
      } catch (error) {
        ctx.throw(500, error);
      }
    },
    async find(ctx) {
      const logger = new Logger("find").getLogger();
      try {
        await this.validateQuery(ctx);
        const sanitizedQuery = await this.sanitizeQuery(ctx);
        const userPriceSheets = await strapi.entityService.findMany(
          USER_PRICE_SHEET_ROUTE,
          {
            ...sanitizedQuery,
            populate: {
              user: {
                fields: ["username", "email"],
              },
              price_sheet: {
                populate: {
                  carrier: true,
                },
              },
            },
          },
        );
        const sanitizedUserPriceSheets = await this.sanitizeOutput(
          userPriceSheets,
          ctx,
        );
        return this.transformResponse(sanitizedUserPriceSheets);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
