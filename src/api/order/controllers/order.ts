/**
 * order controller
 */

import { factories } from "@strapi/strapi";

import {
  checkOrderFields,
  checkUpdateOrderFields,
  mappingExcelOrders,
  sanitizeOrderOutput,
} from "../services/utils";
import { ORDER_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { generateQRCode } from "../../../helper/qrcode/qrcode";
import { parseBody } from "../../../helper/transform";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(ORDER_ROUTE, ({ strapi }) => ({
  async createOneOrder(ctx) {
    const logger = new Logger("createOneOrder").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for create one order: ", data);
      const { isValid, errors } = checkOrderFields(data);
      if (!isValid) {
        return ctx.badRequest(errors);
      }
      const carrier_type = data.carrier;
      const newOrder = await strapi
        .service(ORDER_ROUTE)
        .createOrder(data, carrier_type);
      const sanitizedNewOrder = await this.sanitizeOutput(newOrder, ctx);
      return this.transformResponse(sanitizedNewOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async createPartialOrder(ctx) {
    const logger = new Logger("createPartialOrder").getLogger();
    try {
      const { id } = ctx.params;
      logger.debug(
        `POST request data for create one partial order with id: ${id}`,
      );
      const newOrder = await strapi
        .service(ORDER_ROUTE)
        .createPartialOrder(Number(id));
      const sanitizedNewOrder = await this.sanitizeOutput(newOrder, ctx);
      return this.transformResponse(sanitizedNewOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async delete(ctx) {
    const logger = new Logger("delete").getLogger();
    try {
      const { id } = ctx.params;
      logger.debug(`Delete order with id: ${id}`);
      const deletedOrder = await strapi
        .service(ORDER_ROUTE)
        .deleteOrder(Number(id));
      return this.transformResponse({
        message: `Xóa đơn hàng với id ${deletedOrder.id}`,
      });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async find(ctx) {
    const logger = new Logger("find").getLogger();
    try {
      await this.validateQuery(ctx);
      const { results: orders, pagination } = await strapi
        .service(ORDER_ROUTE)
        .findManyOrders(ctx);
      const sanitizedOrders = sanitizeOrderOutput(orders, ctx);
      return this.transformResponse(sanitizedOrders, { pagination });
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
      logger.debug("PUT request data for update one order: ", data);
      const { isValid, errors } = await checkUpdateOrderFields(data, id);
      if (!isValid) {
        return ctx.badRequest(errors);
      }
      const updatedOrder = await strapi
        .service(ORDER_ROUTE)
        .updateOrder({ id }, data);
      const sanitizedUpdatedOrder = await this.sanitizeOutput(
        updatedOrder,
        ctx,
      );
      return this.transformResponse(sanitizedUpdatedOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    const logger = new Logger("findOne").getLogger();
    try {
      const { id } = ctx.params;
      const order = await strapi.service(ORDER_ROUTE).findOrderById(id);
      const sanitizedOrder = sanitizeOrderOutput(order, ctx);
      return this.transformResponse(sanitizedOrder);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async uploadOrders(ctx) {
    const logger = new Logger("uploadOrders").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for upload orders: ", data);
      const { customer, carrier, order_items } = data;
      const creator = ctx.state.user.id;
      if (!order_items) {
        return ctx.badRequest("Thiếu trường order_items.");
      } else if (!carrier) {
        return ctx.badRequest("Thiếu trường carrier.");
      } else if (!customer) {
        return ctx.badRequest("Thiếu trường customer.");
      }
      const { isValid, errors } = checkOrderFields(order_items, true);
      if (!isValid) {
        return ctx.badRequest(errors);
      }
      const mappedOrders = mappingExcelOrders(order_items);
      const createdOrders = await strapi
        .service(ORDER_ROUTE)
        .createManyOrders(mappedOrders, creator, customer, carrier);
      const sanitizedCreatedOrders = await this.sanitizeOutput(
        createdOrders,
        ctx,
      );
      return this.transformResponse(sanitizedCreatedOrders);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async creteWaybill(ctx) {
    const logger = new Logger("creteWaybill").getLogger();
    try {
      const { id } = ctx.params;
      const order = await strapi.service(ORDER_ROUTE).findOrderById(id);
      const sanitizedOrder = await this.sanitizeOutput(order, ctx);
      return this.transformResponse({
        ...sanitizedOrder,
        QRCodeUrl: await generateQRCode(sanitizedOrder.tracking_id),
      });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
