/**
 * bank controller
 */

import { factories } from "@strapi/strapi";
import { BANK_ROUTE } from "../../../helper/constants";
import { parseBody } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(BANK_ROUTE, ({ strapi }) => ({
  async create(ctx) {
    const logger = new Logger("create").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for create one bank: ", data);
      if (!data.name) {
        return ctx.badRequest("Thiếu trường name.");
      }
      const createdBank = await strapi.service(BANK_ROUTE).createBank(data);
      const sanitizedCreatedBank = await this.sanitizeOutput(createdBank, ctx);
      logger.info("sanitizedCreatedBank: ", sanitizedCreatedBank);
      return this.transformResponse(sanitizedCreatedBank);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async createMany(ctx) {
    const logger = new Logger("createMany").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for create many banks: ", data);
      const createdBanks = await strapi.service(BANK_ROUTE).createBanks(data);
      const sanitizedCreatedBanks = await this.sanitizeOutput(
        createdBanks,
        ctx,
      );
      logger.info("sanitizedCreatedBanks: ", sanitizedCreatedBanks);
      return this.transformResponse(sanitizedCreatedBanks);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async find(ctx) {
    const logger = new Logger("find").getLogger();
    try {
      await this.validateQuery(ctx);
      const { results: banks, pagination } = await strapi
        .service(BANK_ROUTE)
        .getBanks(ctx);
      const sanitizedBanks = await this.sanitizeOutput(banks, ctx);
      return this.transformResponse(sanitizedBanks, { pagination });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async update(ctx) {
    const logger = new Logger("update").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("PUT request data for update one bank: ", data);
      const { id } = ctx.params;
      const updatedBank = await strapi
        .service(BANK_ROUTE)
        .updateOneBank(id, data);
      const sanitizedUpdatedBank = await this.sanitizeOutput(updatedBank, ctx);
      return this.transformResponse(sanitizedUpdatedBank);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async delete(ctx) {
    const logger = new Logger("delete").getLogger();
    try {
      const { id } = ctx.params;
      logger.debug(`Delete bank with id: ${id}`);
      const deletedBank = await strapi.service(BANK_ROUTE).deleteOneBank(id);
      return this.transformResponse(deletedBank);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
