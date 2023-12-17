import { factories } from "@strapi/strapi";
import {
  calculateShipmentFee,
  convertWeight,
} from "../../order/services/order-services";
import { checkCalculateShipmentFeesFields } from "../services/utils";
import { USER_PRICE_SHEET_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { parseBody } from "../../../helper/transform";
const { isObject } = require("lodash/fp");
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreController(USER_PRICE_SHEET_ROUTE, () => ({
  async calculateShipmentFees(ctx) {
    const logger = new Logger("calculateShipmentFees").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      logger.debug("POST request data for calculateShipmentFees: ", data);
      const { errors, isValid } = checkCalculateShipmentFeesFields(data);
      if (!isValid) {
        return ctx.badRequest(errors);
      }
      const { userId } = ctx.params;
      let {
        parcel_value,
        from_province_code,
        to_province_code,
        weight,
        has_insurance,
        height,
        width,
        length,
      } = data;

      const priceSheets = await strapi
        .service(USER_PRICE_SHEET_ROUTE)
        .getPriceSheetsByUserId(userId);

      const shipmentFees = await Promise.all(
        priceSheets.map(async ({ price_sheet }) => {
          const conversionRateWeight = convertWeight(
            weight,
            height,
            width,
            length,
            price_sheet.carrier.name,
          );
          logger.info(`carrier: ${price_sheet.carrier.name}`);
          logger.info(`conversionRateWeight: ${conversionRateWeight}`);
          return {
            carrier: price_sheet.carrier,
            conversionRateWeight,
            shipmentFee: await calculateShipmentFee(
              parcel_value,
              price_sheet.price_items,
              from_province_code,
              to_province_code,
              conversionRateWeight,
              has_insurance,
              price_sheet.carrier.id,
            ),
          };
        }),
      );
      const sanitizedShipmentFees = await this.sanitizeOutput(
        shipmentFees,
        ctx,
      );
      return this.transformResponse(
        sanitizedShipmentFees.filter((item: any) => item.shipmentFee !== null),
      );
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async findPriceSheetByUserIdAndCarrier(ctx) {
    const logger = new Logger("findPriceSheetByUserIdAndCarrier").getLogger();
    try {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const { userId, carrier } = sanitizedQuery;
      if (!userId) {
        return ctx.badRequest("Thiếu trường userId.");
      }
      if (!carrier) {
        return ctx.badRequest("Thiếu trường carrier.");
      }
      const priceSheet = await strapi
        .service(USER_PRICE_SHEET_ROUTE)
        .getPriceSheetByUserIdAndCarrier(userId, carrier);
      if (!priceSheet) {
        throw new NotFoundError("Không tìm thấy bảng giá.");
      }
      const sanitizedPriceSheet = await this.sanitizeOutput(priceSheet, ctx);
      return this.transformResponse(sanitizedPriceSheet);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async groupByCustomer(ctx) {
    const logger = new Logger("groupByCustomer").getLogger();
    try {
      await this.validateQuery(ctx);
      const { priceSheetsByCustomer, pagination } = await strapi
        .service(USER_PRICE_SHEET_ROUTE)
        .groupPriceSheetsByCustomer(ctx);
      const sanitizedGroupPriceSheets = await this.sanitizeOutput(
        priceSheetsByCustomer,
        ctx,
      );
      return this.transformResponse(sanitizedGroupPriceSheets, { pagination });
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },

  async findPriceSheetsByUserId(ctx) {
    const logger = new Logger("findPriceSheetsByUserId").getLogger();
    try {
      const { userId } = ctx.params;
      if (!userId) {
        return ctx.badRequest("Thiếu trường userId.");
      }
      const pricesheets = await strapi
        .service(USER_PRICE_SHEET_ROUTE)
        .getPriceSheetsByUserId(userId);
      const sanitizedPriceSheets = await this.sanitizeOutput(pricesheets, ctx);
      return this.transformResponse(sanitizedPriceSheets);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
}));
