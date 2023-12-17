import { factories } from "@strapi/strapi";
const { ApplicationError } = require("@strapi/utils").errors;
const { GHN_API_URL, GHN_TOKEN_ID_1, OPEN_STREET_MAP_URL } = process.env;
import axios from "axios";
import { ORDER_ROUTE, PROVINCE_ROUTE } from "../../../helper/constants";
import { apiAxios } from "../../../helper/apiHelper";
import { removeAccents } from "../../../helper/unorm";
import { transformHttpError } from "../../../helper/errorHelper";
import { parseBody } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";
const { isObject } = require("lodash/fp");

export default factories.createCoreController(ORDER_ROUTE, () => ({
  async findProvince(ctx) {
    const logger = new Logger("findProvince").getLogger();
    try {
      const response = await apiAxios({
        method: "get",
        url: `${GHN_API_URL}/shiip/public-api/master-data/province`,
        headers: { token: GHN_TOKEN_ID_1 },
      });
      if (!response.data.data || response.data.code === 401) {
        strapi.log.error(response.data.message);
        throw new ApplicationError(response.data.message);
      }
      return this.transformResponse(response.data);
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
  async findDistrictByProvinceId(ctx) {
    const logger = new Logger("findDistrictByProvinceId").getLogger();
    try {
      const { provinceId } = ctx.params;
      const response = await apiAxios({
        method: "get",
        url: `${GHN_API_URL}/shiip/public-api/master-data/district`,
        headers: { token: GHN_TOKEN_ID_1 },
        data: {
          province_id: Number(provinceId),
        },
      });
      strapi.log.debug(response.data);
      if (!response.data.data || response.data.code === 401) {
        strapi.log.error(response.data.message);
        throw new ApplicationError(response.data.message);
      }
      return this.transformResponse(response.data);
    } catch (error) {
      logger.error("Error: ", error);
      const { statusCode, message } = transformHttpError(error);
      ctx.throw(statusCode, message);
    }
  },
  async findWardByDistrictId(ctx) {
    const logger = new Logger("searchAddressDetail").getLogger();
    try {
      const districtID = ctx.request.params.districtID;
      const response = await apiAxios({
        method: "get",
        url: `${GHN_API_URL}/shiip/public-api/master-data/ward`,
        headers: { token: GHN_TOKEN_ID_1 },
        data: {
          district_id: Number(districtID),
        },
      });
      if (!response.data.data || response.data.code === 401) {
        strapi.log.error(response.data.message);
        throw new ApplicationError(response.data.message);
      }
      return this.transformResponse(response.data);
    } catch (error) {
      logger.error("Error: ", error);
      const { statusCode, message } = transformHttpError(error);
      ctx.throw(statusCode, message);
    }
  },
  async searchAddressDetail(ctx) {
    const logger = new Logger("searchAddressDetail").getLogger();
    try {
      const { q } = ctx.query;
      const response = await axios.get(`${OPEN_STREET_MAP_URL}/search`, {
        params: {
          q,
          format: "json",
          country: "VN",
        },
      });
      return this.transformResponse(response.data);
    } catch (error) {
      logger.error("Error: ", error);
      const { statusCode, message } = transformHttpError(error);
      ctx.throw(statusCode, message);
    }
  },
  async parse(ctx) {
    const logger = new Logger("parse").getLogger();
    try {
      const { data } = parseBody(ctx);
      if (!isObject(data)) {
        return ctx.badRequest("Thiếu trường data.");
      }
      const { order_items } = data;
      if (!order_items) {
        return ctx.badRequest("Thiếu trường order_items.");
      }

      const provinces = await strapi.service(PROVINCE_ROUTE).findManyProvince();
      const new_order_items = order_items.map((order: any) => {
        const province = provinces.find((province: any) => {
          const extensionNames = province.extensions_name.split(",");
          const extensionName = extensionNames.find((ex) =>
            removeAccents(order.to_address)
              .trim()
              .toLowerCase()
              .includes(removeAccents(ex).toLowerCase().trim()),
          );

          return !!extensionName;
        });
        let district = null;
        let ward = null;

        if (province) {
          district = province.districts.find((d: any) => {
            const extensionNames = d.extensions_name.split(",");
            const extensionName = extensionNames.find((ex) =>
              removeAccents(order.to_address)
                .trim()
                .toLowerCase()
                .includes(removeAccents(ex).toLowerCase().trim()),
            );

            return !!extensionName;
          });
          if (district) {
            ward = district.wards.find((w: any) => {
              const extensionNames = w.extensions_name.split(",");
              const extensionName = extensionNames.find((ex) =>
                removeAccents(order.to_address)
                  .trim()
                  .toLowerCase()
                  .includes(removeAccents(ex).toLowerCase().trim()),
              );

              return !!extensionName;
            });
          }
        }

        return {
          ...order,
          to_province: province ? province.name : null,
          to_province_code: province ? province.province_id : null,
          to_district: district ? district.name : null,
          to_district_code: district ? district.district_id : null,
          to_ward: ward ? ward.name : null,
          to_ward_code: ward ? ward.ward_id : null,
        };
      });
      return this.transformResponse(new_order_items);
    } catch (error) {
      logger.error("Error: ", error);
      const { statusCode, message } = transformHttpError(error);
      ctx.throw(statusCode, message);
    }
  },
}));
