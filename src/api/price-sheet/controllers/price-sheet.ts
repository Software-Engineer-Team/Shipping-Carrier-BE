/**
 * price-sheet controller
 */

import { factories } from "@strapi/strapi";
import { PRICE_SHEET_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { parseBody } from "../../../helper/transform";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(
  PRICE_SHEET_ROUTE,
  ({ strapi }) => ({
    async findOne(ctx) {
      const logger = new Logger("findOne").getLogger();
      try {
        const { id } = ctx.params;
        const price_sheet = await strapi
          .service(PRICE_SHEET_ROUTE)
          .findPriceSheetById(id);
        const sanitizedPriceSheet = await this.sanitizeOutput(price_sheet, ctx);
        return this.transformResponse(sanitizedPriceSheet);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async create(ctx) {
      const logger = new Logger("create").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Thiếu trường data.");
        }
        logger.debug("POST request data for create one priceSheet: ", data);
        const price_sheet = await strapi
          .service(PRICE_SHEET_ROUTE)
          .createPriceSheet(data);
        const sanitizedPriceSheet = await this.sanitizeOutput(price_sheet, ctx);
        return this.transformResponse(sanitizedPriceSheet);
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
        logger.debug("PUT request data for create one priceSheet: ", data);
        const updatedPriceSheet = await strapi
          .service(PRICE_SHEET_ROUTE)
          .updatePriceSheet(id, data);
        const sanitizedUpdatedPriceSheet = await this.sanitizeOutput(
          updatedPriceSheet,
          ctx,
        );
        return this.transformResponse(sanitizedUpdatedPriceSheet);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async delete(ctx) {
      const logger = new Logger("delete").getLogger();
      try {
        const { id } = ctx.params;
        logger.debug(`Delete priceSheet with id: ${id}`);
        const price_sheet = await strapi
          .service(PRICE_SHEET_ROUTE)
          .deletePriceSheet(id);
        return this.transformResponse({
          message: `Xóa bảng giá với id ${price_sheet.id}`,
        });
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
