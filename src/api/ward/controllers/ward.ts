/**
 * ward controller
 */

import { factories } from "@strapi/strapi";
import { WARD_ROUTE } from "../../../helper/constants";
import { redis } from "../../../helper/queues/redis-config";
import { Logger } from "../../../helper/logger/logger";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreController(WARD_ROUTE, ({ strapi }) => ({
  async create(ctx) {
    const logger = new Logger("create").getLogger();
    try {
      const wards = await strapi.service(WARD_ROUTE).createWards();
      return this.transformResponse(wards);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async find(ctx) {
    const logger = new Logger("find").getLogger();
    try {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const wards = await redis.getOrSetCache(
        WARD_ROUTE,
        `${WARD_ROUTE}-${JSON.stringify(sanitizedQuery)}-${ctx.state.user.id}`,
        async () => {
          return strapi.entityService.findMany(WARD_ROUTE, {
            ...sanitizedQuery,
            fields: ["name", "ward_id"],
            populate: {
              district: {
                fields: ["name", "district_id"],
              },
            },
          });
        },
      );
      const sanitizedWards = await this.sanitizeOutput(wards, ctx);
      return this.transformResponse(sanitizedWards);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async findOne(ctx) {
    const logger = new Logger("findOne").getLogger();
    try {
      const { id } = ctx.params;
      const ward = await redis.getOrSetCache(
        WARD_ROUTE,
        `${WARD_ROUTE}-${id}-${ctx.state.user.id}`,
        async () => {
          const result = await strapi.db.query(WARD_ROUTE).findOne({
            select: ["name", "ward_id"],
            where: {
              ward_id: id,
            },
            populate: {
              district: {
                select: ["name", "district_id"],
              },
            },
          });
          if (!result) {
            throw new NotFoundError("Phường/Xã không tồn tại.");
          }
          return result;
        },
      );
      const sanitizedWard = await this.sanitizeOutput(ward, ctx);
      return this.transformResponse(sanitizedWard);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
