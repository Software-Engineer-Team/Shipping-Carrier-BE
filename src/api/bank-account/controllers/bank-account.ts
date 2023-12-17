/**
 * bank-account controller
 */

import { factories } from "@strapi/strapi";
import { BANK_ACCOUNT_ROUTE } from "../../../helper/constants";
import {
  checkCreateBankAccountFields,
  checkUploadBankAccountFields,
} from "../services/utils";
import { parseBody } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(
  BANK_ACCOUNT_ROUTE,
  ({ strapi }) => ({
    async createMany(ctx) {
      const logger = new Logger("createMany").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Thiếu trường data.");
        }
        logger.debug("POST request data for create many bankAccounts: ", data);
        let { bankAccounts } = data;
        if (!bankAccounts) {
          return ctx.badRequest("Thiếu trường bankAccounts.");
        }
        const { isValid, errors } = checkUploadBankAccountFields(bankAccounts);

        if (!isValid) return ctx.badRequest(errors);
        const createdBankAccounts = await Promise.all(
          bankAccounts.map(async (bankAccount) => {
            return await strapi
              .service(BANK_ACCOUNT_ROUTE)
              .createBankAccount(bankAccount);
          }),
        );

        const sanitizedCreatedBankAccounts = await this.sanitizeOutput(
          createdBankAccounts,
          ctx,
        );
        logger.info(
          "sanitizedCreatedBankAccounts: ",
          sanitizedCreatedBankAccounts,
        );
        return this.transformResponse(sanitizedCreatedBankAccounts);
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
        logger.debug("POST request data for create one bankAccount: ", data);
        const { isValid, errors } = checkCreateBankAccountFields(data);

        if (!isValid) return ctx.badRequest(errors);

        const createdBankAccount = await strapi
          .service(BANK_ACCOUNT_ROUTE)
          .createBankAccount(data);
        const sanitizedCreatedBankAccount = await this.sanitizeOutput(
          createdBankAccount,
          ctx,
        );
        logger.info(
          "sanitizedCreatedBankAccount: ",
          sanitizedCreatedBankAccount,
        );
        return this.transformResponse(sanitizedCreatedBankAccount);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },

    async find(ctx) {
      const logger = new Logger("find").getLogger();
      try {
        await this.validateQuery(ctx);
        const { results: bankAccounts, pagination } = await strapi
          .service(BANK_ACCOUNT_ROUTE)
          .getBankAccounts(ctx);
        const sanitizedBankAccounts = await this.sanitizeOutput(
          bankAccounts,
          ctx,
        );
        return this.transformResponse(sanitizedBankAccounts, { pagination });
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },

    async findOne(ctx) {
      const logger = new Logger("findOne").getLogger();
      try {
        const { id } = ctx.params;
        const bankAccount = await strapi
          .service(BANK_ACCOUNT_ROUTE)
          .findBankAccountById(id);
        const sanitizedBankAccount = await this.sanitizeOutput(
          bankAccount,
          ctx,
        );
        return this.transformResponse(sanitizedBankAccount);
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
        logger.debug("PUT request data for update one bankAccount: ", data);
        const { id } = ctx.params;
        if (!data.user) return ctx.badRequest("Missing user field!");
        else if (data.default === undefined)
          return ctx.badRequest("Missing default field!");
        const updatedBankAccount = await strapi
          .service(BANK_ACCOUNT_ROUTE)
          .updateOneBankAccount(id, data.user, data, data.default);
        const sanitizedUpdatedBankAccount = await this.sanitizeOutput(
          updatedBankAccount,
          ctx,
        );
        return this.transformResponse(sanitizedUpdatedBankAccount);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },

    async delete(ctx) {
      const logger = new Logger("delete").getLogger();
      try {
        const { id } = ctx.params;
        logger.debug(`Delete bankAccount with id: ${id}`);
        const deletedBankAccount = await strapi
          .service(BANK_ACCOUNT_ROUTE)
          .deleteOneBankAccount(id);
        return this.transformResponse(deletedBankAccount);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
