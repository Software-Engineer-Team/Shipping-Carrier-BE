/**
 * province controller
 */

import { factories } from "@strapi/strapi";
import { PROVINCE_ROUTE } from "../../../helper/constants";
import { redis } from "../../../helper/queues/redis-config";
import { Logger } from "../../../helper/logger/logger";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreController(PROVINCE_ROUTE, ({ strapi }) => ({
  async create(ctx) {
    const logger = new Logger("create").getLogger();
    try {
      const provinces = await strapi.service(PROVINCE_ROUTE).createProvince();
      return this.transformResponse(provinces);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async find(ctx) {
    const logger = new Logger("find").getLogger();
    try {
      const provinces = await redis.getOrSetCache(
        PROVINCE_ROUTE,
        `${PROVINCE_ROUTE}-${ctx.state.user.id}`,
        async () => {
          return await strapi.entityService.findMany(PROVINCE_ROUTE, {
            fields: ["name", "province_id"],
          });
        },
      );
      const sanitizedResults = await this.sanitizeOutput(provinces, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async findOne(ctx) {
    const logger = new Logger("findOne").getLogger();
    try {
      const { id } = ctx.params;
      const province = await redis.getOrSetCache(
        PROVINCE_ROUTE,
        `${PROVINCE_ROUTE}-${id}-${ctx.state.user.id}`,
        async () => {
          const result = await strapi.db.query(PROVINCE_ROUTE).findOne({
            select: ["name", "province_id"],
            where: {
              province_id: id,
            },
          });
          if (!result) {
            throw new NotFoundError("Tỉnh thành không tồn tại.");
          }
          return result;
        },
      );
      const sanitizedDistrict = await this.sanitizeOutput(province, ctx);
      return this.transformResponse(sanitizedDistrict);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
