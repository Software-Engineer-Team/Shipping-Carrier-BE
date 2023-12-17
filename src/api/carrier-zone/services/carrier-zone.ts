/**
 * carrier-zone service
 */

import { factories } from "@strapi/strapi";
import { CARRIER_ZONE_ROUTE } from "../../../helper/constants";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreService(CARRIER_ZONE_ROUTE, {
  async findCarrierZones(
    provinceCodes: number[] | string[],
    carrier: number | string,
  ) {
    const regions = await strapi.db.query(CARRIER_ZONE_ROUTE).findMany({
      where: {
        provinces: {
          province_id: {
            $in: provinceCodes,
          },
        },
        carrier,
      },
      populate: ["provinces", "carrier"],
    });
    if (!regions.length) {
      throw new NotFoundError(
        `Không tìm thấy các khu vực cho đơn vị vận chuyển với id ${carrier} và mã tỉnh ${provinceCodes.join(
          ",",
        )}`,
      );
    }
    return regions;
  },
  async findOneCarrierZone(
    provinceCode: number | string,
    carrier: number | string,
  ) {
    const region = await strapi.db.query(CARRIER_ZONE_ROUTE).findOne({
      where: {
        $and: [
          {
            provinces: {
              province_id: provinceCode,
            },
          },
          {
            carrier,
          },
        ],
      },
      populate: ["carrier"],
    });
    if (!region) {
      throw new NotFoundError(
        `Không tìm thấy khu vực cho đơn vị vận chuyển với id ${carrier} và mã tỉnh ${provinceCode}`,
      );
    }
    return region;
  },
});
