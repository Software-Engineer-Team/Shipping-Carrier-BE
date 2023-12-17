/**
 * district service
 */

import { factories } from "@strapi/strapi";
import { DISTRICT_ROUTE, PROVINCE_ROUTE } from "../../../helper/constants";
const { ApplicationError } = require("@strapi/utils").errors;
const { GHN_API_URL, GHN_TOKEN_ID_1 } = process.env;
import { apiAxios } from "../../../helper/apiHelper";

export default factories.createCoreService(DISTRICT_ROUTE, {
  async findDistrict() {
    const response = await apiAxios({
      method: "get",
      url: `${GHN_API_URL}/shiip/public-api/master-data/district`,
      headers: { token: GHN_TOKEN_ID_1 },
    });
    if (!response.data.data || response.data.code === 401) {
      strapi.log.error(response.data.message);
      throw new ApplicationError(response.data.message);
    }
    return { ...response.data };
  },
  async createDistrict() {
    const res = await strapi.service(DISTRICT_ROUTE).findDistrict();
    const districtIds = res.data.map((district: any) =>
      Number(district.DistrictID),
    );
    const existDistricts = await strapi.db.query(DISTRICT_ROUTE).findMany({
      where: {
        district_id: {
          $in: districtIds,
        },
      },
    });

    if (!existDistricts.length) {
      const createdDistricts = await Promise.all(
        res.data.map(async (district: any) => {
          const province = await strapi.db.query(PROVINCE_ROUTE).findOne({
            where: {
              province_id: Number(district.ProvinceID),
            },
          });

          const data = {
            district_id: Number(district.DistrictID),
            name: district.DistrictName,
            extensions_name: `${district.NameExtension ? district.NameExtension.join(",") : ""
              }`,
            province: province.id,
          };

          return await strapi.entityService.create(DISTRICT_ROUTE, {
            data,
            populate: {
              province: {
                fields: ["province_id", "name"],
              },
            },
          });
        }),
      );
      return {
        data: createdDistricts.map(
          (d) => `district ::: ${d.name} ::: ID=${d.district_id}`,
        ),
      };
    }

    return {
      message: "Các quận/huyện(districts) đã tồn tại.",
      data: existDistricts.map(
        (d) => `district ::: ${d.name} ::: ID=${d.district_id}`,
      ),
    };
  },
});
