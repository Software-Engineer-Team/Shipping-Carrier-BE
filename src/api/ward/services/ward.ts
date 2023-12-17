/**
 * ward service
 */

import { factories } from "@strapi/strapi";
import { WARD_ROUTE, DISTRICT_ROUTE } from "../../../helper/constants";
const { ApplicationError } = require("@strapi/utils").errors;
const { GHN_API_URL, GHN_TOKEN_ID_1 } = process.env;
import { apiAxios } from "../../../helper/apiHelper";
import { BaseConsumerService } from "../../../helper/queues/consumer";
import { handleWorkerWards, initWorkerOptions } from "./ward-queue-service";
import { ProducerService } from "../../../helper/queues/producer";

export default factories.createCoreService(WARD_ROUTE, {
  async findWard(district_id: number) {
    const response = await apiAxios({
      method: "get",
      url: `${GHN_API_URL}/shiip/public-api/master-data/ward`,
      headers: { token: GHN_TOKEN_ID_1 },
      data: { district_id: Number(district_id) },
    });
    if (!response.data.data || response.data.code === 401) {
      console.log(response.data, district_id);
      throw new ApplicationError(response.data.message);
    }
    return { ...response.data };
  },
  async createWards() {
    const QUEUE_NAME = "WARDS";
    const consumerService = new BaseConsumerService(QUEUE_NAME);
    consumerService.init(handleWorkerWards, initWorkerOptions());
    const producerService = new ProducerService(QUEUE_NAME);

    const districts = await strapi.entityService.findMany(DISTRICT_ROUTE, {});
    await producerService.addJobs(
      districts.map(({ district_id }) => {
        return {
          district_id,
        };
      }),
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    await producerService.closeJobQueue();
    return {
      message: "Các phường/xã(wards) đang được xử lý.",
    };
  },
  async createWard(district_id: number) {
    const res = await strapi.service(WARD_ROUTE).findWard(district_id);
    const wardIds = res.data.map((ward: any) => ward.WardCode);
    const existWards = await strapi.db.query(WARD_ROUTE).findMany({
      where: {
        ward_id: {
          $in: wardIds,
        },
      },
    });
    if (!existWards.length) {
      const createdWards = await Promise.all(
        res.data.map(async (ward: any) => {
          const district = await strapi.db.query(DISTRICT_ROUTE).findOne({
            where: {
              district_id: Number(ward.DistrictID),
            },
          });

          const data = {
            ward_id: ward.WardCode,
            name: ward.WardName,
            extensions_name: `${ward.NameExtension ? ward.NameExtension.join(",") : ""
              }`,
            district: district.id,
          };

          return await strapi.entityService.create(WARD_ROUTE, {
            data,
            populate: {
              district: {
                fields: ["district_id", "name"],
              },
            },
          });
        }),
      );
      return { data: createdWards };
    }
    return {
      message: "Các phường/xã(wards) đã tồn tại",
      data: existWards.map((w) => w.ward_id),
    };
  },
});
