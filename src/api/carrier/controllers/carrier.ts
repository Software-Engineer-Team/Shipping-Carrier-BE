/**
 * carrier controller
 */

import { factories } from "@strapi/strapi";
import { CARRIER_ROUTE, USER_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");
import { parseBody } from "../../../helper/transform";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreController(CARRIER_ROUTE, ({ strapi }) => ({
  async updateUserCarrier(ctx) {
    const logger = new Logger("updateUserCarrier").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for update one carrier: ", data);
      const { userId, carrier } = data;
      if (!userId) {
        return ctx.badRequest("Thiếu trường userId.");
      }
      if (!carrier) {
        return ctx.badRequest("Thiếu trường carrier.");
      }
      const user = await strapi.entityService.update(USER_ROUTE, userId, {
        data: {
          carrier,
        },
        fields: ["username", "email"],
        populate: {
          carrier: true,
        },
      });
      if (!user) {
        throw new NotFoundError(`Không tìm thấy người dùng với id ${userId}.`);
      }
      const sanitizedUser = await this.sanitizeOutput(user, ctx);
      return this.transformResponse(sanitizedUser);
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
      logger.debug("POST request data for create one carrier: ", data);
      const createdCarrier = await strapi
        .service(CARRIER_ROUTE)
        .createCarrier(data);
      const sanitizedCreatedCarrier = await this.sanitizeOutput(
        createdCarrier,
        ctx,
      );
      return this.transformResponse(sanitizedCreatedCarrier);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
