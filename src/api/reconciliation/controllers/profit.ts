/**
 * profit controller
 */

import { factories } from "@strapi/strapi";
import { RECONCILIATION_ROUTE } from "../../../helper/constants";
import {
  getProfitReportByReconId,
  getProfitReportReconciliations,
} from "../services/profit";
import { ROLE } from "../../../helper/apiHelper";
import { sanitizeOutput } from "../../../helper/transform";
import { Logger } from "../../../helper/logger/logger";

export default factories.createCoreController(
  RECONCILIATION_ROUTE,
  ({ strapi }) => ({
    async getProfitByReconId(ctx) {
      const logger = new Logger("getProfitByReconId").getLogger();
      try {
        const { id } = ctx.params;
        const {
          user: { role },
        } = ctx.state;
        let profits = await getProfitReportByReconId(id);

        if (role.type.toUpperCase() !== ROLE.ADMIN.toUpperCase()) {
          profits = sanitizeOutput(profits, [
            "total_system_revenue",
            "partner_return_fee",
            "partner_insurance_fee",
            "partner_cash_on_delivery",
            "partner_shipment_fee",
            "partner_return_fee",
          ]);
        }
        return this.transformResponse(profits);
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
    async getProfitReconciliations(ctx) {
      const logger = new Logger("getProfitReconciliations").getLogger();
      try {
        let { totalprofits, pagination } =
          await getProfitReportReconciliations(ctx);
        return this.transformResponse(totalprofits, { pagination });
      } catch (error) {
        logger.error("Error: ", error);
        ctx.throw(500, error);
      }
    },
  }),
);
