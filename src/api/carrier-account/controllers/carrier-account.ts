/**
 * carrier-account controller
 */

import { factories } from "@strapi/strapi";
import { CARRIER_ACCOUNT_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");
import { parseBody } from "../../../helper/transform";

export default factories.createCoreController(
  CARRIER_ACCOUNT_ROUTE,
  ({ strapi }) => ({
    async create(ctx) {
      const logger = new Logger("create").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Thiếu trường data.");
        }
        logger.debug("POST request data for create one carrierAccount: ", data);
        const { carrier, account_name } = data;
        if (!carrier) {
          return ctx.badRequest("Thiếu trường carrier.");
        }
        if (!account_name) {
          return ctx.badRequest("Thiếu trường account_name.");
        }
        const { data: account, message } = await strapi
          .service(CARRIER_ACCOUNT_ROUTE)
          .createOneCarrierAccount(carrier, data);
        const sanitizedAccount = await this.sanitizeOutput(account, ctx);
        return this.transformResponse(sanitizedAccount, { message });
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async find(ctx) {
      const logger = new Logger("find").getLogger();
      try {
        await this.validateQuery(ctx);
        const { results: carrierAccounts, pagination } = await strapi
          .service(CARRIER_ACCOUNT_ROUTE)
          .findCarrierAccounts(ctx);
        const sanitizedCarrierAccounts = await this.sanitizeOutput(
          carrierAccounts,
          ctx,
        );
        return this.transformResponse(sanitizedCarrierAccounts, { pagination });
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async findOne(ctx) {
      const logger = new Logger("findOne").getLogger();
      try {
        const { id } = ctx.params;
        const account = await strapi
          .service(CARRIER_ACCOUNT_ROUTE)
          .findCarrierAccountById(id);
        const sanitizedAccount = await this.sanitizeOutput(account, ctx);
        return this.transformResponse(sanitizedAccount);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async delete(ctx) {
      const logger = new Logger("delete").getLogger();
      try {
        const { id } = ctx.params;
        logger.debug(`Delete carrierAccount with id: ${id}`);
        const data = await strapi
          .service(CARRIER_ACCOUNT_ROUTE)
          .deleteCarrierAccountById(Number(id));
        return this.transformResponse({
          message: `Đã xóa tài khoản nhà vận chuyển có id ${data.id}`,
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
        logger.debug("PUT request data for update one carrierAccount: ", data);
        const updatedCarrierAccount = await strapi
          .service(CARRIER_ACCOUNT_ROUTE)
          .updateOneCarrierAccount(id, data);
        const sanitizedUpdatedCarrierAccount = await this.sanitizeOutput(
          updatedCarrierAccount,
          ctx,
        );
        return this.transformResponse(sanitizedUpdatedCarrierAccount);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
