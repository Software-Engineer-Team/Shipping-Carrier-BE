/**
 * address controller
 */

import { factories } from "@strapi/strapi";
import { checkCreateAddressFields } from "../services/utils";
import { ADDRESS_ROUTE } from "../../../helper/constants";
import { parseBody } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(ADDRESS_ROUTE, ({ strapi }) => ({
  async createOneAddress(ctx) {
    const logger = new Logger("createOneAddress").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for create one address: ", data);
      const { isValid, errors } = checkCreateAddressFields(data);
      if (!isValid) {
        return ctx.badRequest(errors);
      }
      const createdAddress = await strapi
        .service(ADDRESS_ROUTE)
        .createAddress(data);
      const sanitizedCreatedAddress = await this.sanitizeOutput(
        createdAddress,
        ctx,
      );
      return this.transformResponse(sanitizedCreatedAddress);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async findManyAddresses(ctx) {
    const logger = new Logger("findManyAddresses").getLogger();
    try {
      const { user_id } = await this.sanitizeQuery(ctx);
      if (!user_id) return ctx.badRequest("Thiếu trường user_id.");

      const addresses = await strapi
        .service(ADDRESS_ROUTE)
        .findAddresses(Number(user_id));
      const sanitizedAddresses = await this.sanitizeOutput(addresses, ctx);
      return this.transformResponse(sanitizedAddresses);
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
      logger.debug("PUT request data for update one address: ", data);
      if (!data.user) return ctx.badRequest("Thiếu trường user.");
      else if (data.default === undefined)
        return ctx.badRequest("Thiếu trường default.");
      const updatedAddress = await strapi
        .service(ADDRESS_ROUTE)
        .updateOneAddress(id, data.user, data, data.default);
      const sanitizedUpdatedAddress = await this.sanitizeOutput(
        updatedAddress,
        ctx,
      );
      return this.transformResponse(sanitizedUpdatedAddress);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async delete(ctx) {
    const logger = new Logger("delete").getLogger();
    try {
      const { id } = ctx.params;
      logger.debug(`Delete address with id: ${id}`);
      const deletedAddress = await strapi
        .service(ADDRESS_ROUTE)
        .deleteOneAddress(id);
      return this.transformResponse(deletedAddress);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
