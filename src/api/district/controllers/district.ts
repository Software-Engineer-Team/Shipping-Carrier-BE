/**
 * district controller
 */
import { factories } from "@strapi/strapi";
import { DISTRICT_ROUTE } from "../../../helper/constants";
import { redis } from "../../../helper/queues/redis-config";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreController(DISTRICT_ROUTE, ({ strapi }) => ({
  async create(ctx) {
    try {
      const createdDistricts = await strapi
        .service(DISTRICT_ROUTE)
        .createDistrict();
      return this.transformResponse(createdDistricts);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async find(ctx) {
    try {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const districts = await redis.getOrSetCache(
        DISTRICT_ROUTE,
        `${DISTRICT_ROUTE}-${JSON.stringify(sanitizedQuery)}-${ctx.state.user.id
        }`,
        async () => {
          return strapi.entityService.findMany(DISTRICT_ROUTE, {
            ...sanitizedQuery,
            fields: ["name", "district_id"],
            populate: {
              province: {
                fields: ["name", "province_id"],
              },
            },
          });
        },
      );
      const sanitizedResults = await this.sanitizeOutput(districts, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const district = await redis.getOrSetCache(
        DISTRICT_ROUTE,
        `${DISTRICT_ROUTE}-${id}-${ctx.state.user.id}`,
        async () => {
          const result = await strapi.db.query(DISTRICT_ROUTE).findOne({
            select: ["name", "district_id"],
            where: {
              district_id: id,
            },
            populate: {
              province: {
                select: ["name", "province_id"],
              },
            },
          });
          if (!result) {
            throw new NotFoundError("Quận/Huyện không tồn tại.");
          }
          return result;
        },
      );
      const sanitizedDistrict = await this.sanitizeOutput(district, ctx);
      return this.transformResponse(sanitizedDistrict);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));
