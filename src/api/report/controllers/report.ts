/**
 * A set of functions called "actions" for `report`
 */

import { ORDER_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { getOrdersReportByRole } from "../services/report";
import { sanitize, validate } from "@strapi/utils";

export default {
  async getReportByRole(ctx) {
    const logger = new Logger("getReportByRole").getLogger();
    try {
      const contentType = strapi.contentType(ORDER_ROUTE);
      const auth = {
        auth: ctx.state.auth,
      };
      await validate.contentAPI.query(ctx.query, contentType, auth);
      const { ordersReport, pagination } = await getOrdersReportByRole(ctx);
      const sanitizedOrdersReport = await sanitize.contentAPI.output(
        ordersReport,
        contentType,
        auth,
      );
      return { data: sanitizedOrdersReport, meta: { pagination } };
    } catch (error) {
      logger.error("Error: ", error);
      ctx.throw(500, error);
    }
  },
};
