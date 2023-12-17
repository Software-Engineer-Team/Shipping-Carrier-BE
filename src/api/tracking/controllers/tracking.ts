/**
 * tracking controller
 */

import { factories } from "@strapi/strapi";
import { ORDER_ROUTE, TRACKING_ROUTE } from "../../../helper/constants";
import { Ghn, Ghtk, Ninja } from "../../order/services/carrier-services";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");
import { sanitizeOutput, parseBody } from "../../../helper/transform";

export default factories.createCoreController(TRACKING_ROUTE, ({ strapi }) => ({
  async findMany(ctx) {
    const logger = new Logger("findMany").getLogger();
    try {
      await this.validateQuery(ctx);
      const { trackingId } = ctx.request.query;
      if (!trackingId) {
        return ctx.badRequest("Thiếu trường trackingId.");
      }
      const trackings = await strapi.entityService.findMany(TRACKING_ROUTE, {
        filters: {
          tracking_id: trackingId,
        },
        sort: { createdAt: "ASC" },
      });
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrder({ tracking_id: trackingId });
      const sanitizedOrder = sanitizeOutput(order, ["carrier_account"]);
      return this.transformResponse({ order: sanitizedOrder, trackings });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async listenNinjavanEvent(ctx) {
    const logger = new Logger("listenNinjavanEvent").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      const payload = data;
      if (!payload && !payload.status && !payload.tracking_id) {
        return ctx.badRequest("error");
      }
      const logger = new Logger("trackingOrder").getLogger();
      logger.info("Payload from NJV", payload);
      await Ninja.trackingOrder(payload);

      return this.transformResponse({
        message: "success",
      });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async listenGHNEvent(ctx) {
    const logger = new Logger("listenGHNEvent").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      const payload = data;
      if (!payload && !payload.OrderCode && !payload.Status) {
        return ctx.badRequest("error");
      }
      const logger = new Logger("trackingOrder").getLogger();
      logger.info("Payload from GHN", payload);
      await Ghn.trackingOrder(payload);
      return this.transformResponse({
        message: "success",
      });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async listenGHTKEvent(ctx) {
    const logger = new Logger("listenGHTKEvent").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      const payload = data;
      if (!payload && !payload.label_id && !payload.status_id) {
        return ctx.badRequest("error");
      }
      const logger = new Logger("trackingOrder").getLogger();
      logger.info("Payload from GHTK", payload);
      await Ghtk.trackingOrder(payload);

      return this.transformResponse({
        message: "success",
      });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
