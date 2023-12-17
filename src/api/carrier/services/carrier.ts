/**
 * carrier service
 */

import { factories } from "@strapi/strapi";
import { CARRIER_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";

export default factories.createCoreService(CARRIER_ROUTE, {
  async createCarrier(carrier: any) {
    const logger = new Logger("create").getLogger();
    logger.info("carrier:", carrier);
    return await strapi.entityService.create(CARRIER_ROUTE, {
      data: carrier,
    });
  },
});
