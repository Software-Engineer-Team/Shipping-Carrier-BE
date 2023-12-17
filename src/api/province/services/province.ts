/**
 * province service
 */

import { factories } from "@strapi/strapi";
import { PROVINCE_ROUTE } from "../../../helper/constants";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;
const { GHN_API_URL, GHN_TOKEN_ID_1 } = process.env;
import { apiAxios } from "../../../helper/apiHelper";

export default factories.createCoreService(PROVINCE_ROUTE, {
  async findProvince() {
    const response = await apiAxios({
      method: "get",
      url: `${GHN_API_URL}/shiip/public-api/master-data/province`,
      headers: { token: GHN_TOKEN_ID_1 },
    });
    if (!response.data.data || response.data.code === 401) {
      strapi.log.error(response.data.message);
      throw new ApplicationError(response.data.message);
    }
    return { ...response.data };
  },
  async createProvince() {
    const res = await strapi.service(PROVINCE_ROUTE).findProvince();
    const provinceIds = res.data.map((province: any) =>
      Number(province.ProvinceID),
    );
    const existProvinces = await strapi.db.query(PROVINCE_ROUTE).findMany({
      where: {
        province_id: {
          $in: provinceIds,
        },
      },
    });

    if (!existProvinces.length) {
      const mappedProvice = res.data.map((province: any) => ({
        province_id: Number(province.ProvinceID),
        name: province.ProvinceName,
        extensions_name: `${province.NameExtension ? province.NameExtension.join(",") : ""
          }`,
      }));
      const createdProvinces = await strapi.db
        .query(PROVINCE_ROUTE)
        .createMany({
          data: mappedProvice,
        });
      return {
        data: createdProvinces,
      };
    }

    return {
      message: "Các tỉnh(provinces) đã tồn tại.",
      data: existProvinces.map(
        (p) => `province ::: ${p.name} ::: ID=${p.province_id}`,
      ),
    };
  },

  async findOneProvince(provinceName: string) {
    const province = await strapi.db.query(PROVINCE_ROUTE).findOne({
      where: {
        $or: [
          {
            name: {
              $eqi: provinceName.trim(),
            },
          },
          {
            extensions_name: {
              $containsi: provinceName.trim(),
            },
          },
        ],
      },
      populate: ["districts", "districts.wards"],
    });
    if (!province) {
      throw new NotFoundError(
        `Tỉnh thành ${provinceName} không được tìm thấy.`,
      );
    }
    return province;
  },

  async findManyProvince() {
    const provinces = await strapi.db.query(PROVINCE_ROUTE).findMany({
      populate: ["districts", "districts.wards"],
    });
    return provinces;
  },
});
