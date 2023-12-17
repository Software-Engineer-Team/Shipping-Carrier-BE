/**
 * reconciliation controller
 */

import { factories } from "@strapi/strapi";
import { RECONCILIATION_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { calculateReconProfit, validateReconOrders } from "../services/utils";
import { parseBody } from "../../../helper/transform";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(
  RECONCILIATION_ROUTE,
  ({ strapi }) => ({
    async confirmOne(ctx) {
      const logger = new Logger("confirmOne").getLogger();
      try {
        const { id } = ctx.params;
        logger.debug(`PUT request data for confirm one reconciliation: ${id}`);
        const confirmedReconciliation = await strapi
          .service(RECONCILIATION_ROUTE)
          .confirmReconciliation(id);
        const sanitizedConfirmedReconciliation = await this.sanitizeOutput(
          confirmedReconciliation,
          ctx,
        );
        return this.transformResponse(sanitizedConfirmedReconciliation);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },

    async confirmMany(ctx) {
      const logger = new Logger("confirmMany").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Trường data bị thiếu.");
        }
        logger.debug(
          "POST request data for confirm many reconciliations: ",
          data,
        );
        const { ids } = data;
        if (!ids.length) {
          return ctx.badRequest("Trường đối soát ids bị trống.");
        }

        const updatedReconciliations = await Promise.all(
          ids.map(
            async (id: any) =>
              await strapi
                .service(RECONCILIATION_ROUTE)
                .confirmReconciliation(id),
          ),
        );

        const sanitizedUpdatedReconciliations = await this.sanitizeOutput(
          updatedReconciliations,
          ctx,
        );
        return this.transformResponse(sanitizedUpdatedReconciliations);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async cancelMany(ctx) {
      const logger = new Logger("cancelMany").getLogger();
      try {
        const { data } = parseBody(ctx);
        if (!isObject(data)) {
          return ctx.badRequest("Trường data bị thiếu.");
        }
        logger.debug(
          "POST request data for cancel many reconciliations: ",
          data,
        );
        const { ids } = data;
        if (!ids.length) {
          return ctx.badRequest("Trường đối soát ids bị trống.");
        }

        const canceledReconciliations = await Promise.all(
          ids.map(
            async (id: any) =>
              await strapi
                .service(RECONCILIATION_ROUTE)
                .cancelReconciliation(id),
          ),
        );
        const sanitizedCanceledReconciliations = await this.sanitizeOutput(
          canceledReconciliations,
          ctx,
        );
        return this.transformResponse(sanitizedCanceledReconciliations);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async cancelOne(ctx) {
      const logger = new Logger("cancelOne").getLogger();
      try {
        const { id } = ctx.params;
        logger.debug(`PUT request data for cancel one reconciliation: ${id}`);
        const canceledReconciliation = await strapi
          .service(RECONCILIATION_ROUTE)
          .cancelReconciliation(id);

        const sanitizedCanceledReconciliation = await this.sanitizeOutput(
          canceledReconciliation,
          ctx,
        );
        return this.transformResponse(sanitizedCanceledReconciliation);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async findOne(ctx) {
      const logger = new Logger("findOne").getLogger();
      try {
        const { id } = ctx.params;
        const reconciliation = await strapi
          .service(RECONCILIATION_ROUTE)
          .findReconciliationById(id);

        const sanitizedReconciliation = await this.sanitizeOutput(
          reconciliation,
          ctx,
        );
        return this.transformResponse(sanitizedReconciliation);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },

    async find(ctx) {
      const logger = new Logger("find").getLogger();
      try {
        await this.validateQuery(ctx);
        const { results: reconciliations, pagination } = await strapi
          .service(RECONCILIATION_ROUTE)
          .getReconciliations(ctx);

        const newReconciliations = reconciliations.map(
          (reconciliation: any) => {
            return {
              ...reconciliation,
              ...calculateReconProfit(reconciliation),
            };
          },
        );

        const sanitizedReconciliations = await this.sanitizeOutput(
          newReconciliations,
          ctx,
        );
        return this.transformResponse(sanitizedReconciliations, { pagination });
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
          "POST request data for create many reconciliations: ",
          data,
        );
        const { recon_orders } = data;
        if (!recon_orders)
          return ctx.badRequest("Trường recon_orders bị thiếu.");
        if (!recon_orders.length) {
          return ctx.badRequest("Trường recon_orders bị trống.");
        }

        const { isValid, errors, details } =
          await validateReconOrders(recon_orders);
        if (!isValid) {
          return ctx.badRequest(errors, {
            ...(details ?? {}),
          });
        }
        const reconciliations = await strapi
          .service(RECONCILIATION_ROUTE)
          .createReconciliations(recon_orders);

        const sanitizedReconciliations = await this.sanitizeOutput(
          reconciliations,
          ctx,
        );
        return this.transformResponse(sanitizedReconciliations);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
