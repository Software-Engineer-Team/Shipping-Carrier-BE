/**
 * reconciliation-order controller
 */

import { factories } from "@strapi/strapi";
import { RECONCILIATION_ORDER_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import {
  checkUploadReconciliationFields,
  parseReconciliationOrders,
} from "../services/utils";
import { parseBody } from "../../../helper/transform";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(RECONCILIATION_ORDER_ROUTE, {
  async findOne(ctx) {
    const logger = new Logger("findOne").getLogger();
    try {
      const { id } = ctx.params;
      const rOrder = await strapi
        .service(RECONCILIATION_ORDER_ROUTE)
        .findReconciliationOrderById(id);

      const sanitizedReconciliationOrder = await this.sanitizeOutput(
        rOrder,
        ctx,
      );
      return this.transformResponse(sanitizedReconciliationOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async find(ctx) {
    const logger = new Logger("find").getLogger();
    try {
      await this.validateQuery(ctx);
      const { results: reconciliationOrders, pagination } = await strapi
        .service(RECONCILIATION_ORDER_ROUTE)
        .getReconciliationOrders(ctx);
      const sanitizedReconciliationOrders = await this.sanitizeOutput(
        reconciliationOrders,
        ctx,
      );
      return this.transformResponse(sanitizedReconciliationOrders, {
        pagination,
      });
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
        return ctx.badRequest("Trường data bị thiếu.");
      }
      logger.debug(
        "POST request data for create many reconciliationOrders: ",
        data,
      );
      let { orders } = data;

      if (!orders) {
        return ctx.badRequest("Thiếu trường bắt buộc: orders");
      }

      const { matchingOrders } = await checkUploadReconciliationFields(orders);

      const { reconciliation_orders } = await parseReconciliationOrders(
        orders,
        matchingOrders,
      );
      const createdReconciliationOrders = await strapi
        .service(RECONCILIATION_ORDER_ROUTE)
        .createReconciliationOrders(reconciliation_orders, matchingOrders);

      const sanitizedCreatedReconciliationOrders = await this.sanitizeOutput(
        createdReconciliationOrders,
        ctx,
      );
      return this.transformResponse(sanitizedCreatedReconciliationOrders);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async groupByCustomer(ctx) {
    const logger = new Logger("groupByCustomer").getLogger();
    try {
      await this.validateQuery(ctx);
      const { results: groupedSystemOrders, pagination } = await strapi
        .service(RECONCILIATION_ORDER_ROUTE)
        .groupReconOrdersByCustomer(ctx);

      const sanitizedGroupedSystemOrders = await this.sanitizeOutput(
        groupedSystemOrders,
        ctx,
      );
      return this.transformResponse(sanitizedGroupedSystemOrders, {
        pagination,
      });
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

      const updatedReconOrder = await strapi
        .service(RECONCILIATION_ORDER_ROUTE)
        .updateReconOrder({ id }, data);

      const sanitizedUpdatedOrder = await this.sanitizeOutput(
        updatedReconOrder,
        ctx,
      );
      return this.transformResponse(sanitizedUpdatedOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
});
