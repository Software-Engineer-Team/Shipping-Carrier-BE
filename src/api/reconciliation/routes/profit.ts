/**
 * profit router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "GET",
      path: "/v1/reconciliations/profit/:id",
      handler: "profit.getProfitByReconId",
      config: {
        roles: [ROLE.ADMIN, ROLE.CUSTOMER, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliations/profit",
      handler: "profit.getProfitReconciliations",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
