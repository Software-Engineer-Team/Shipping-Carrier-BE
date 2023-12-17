/**
 * custom-bank router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/customBanks/lookup",
      handler: "custom-bank.lookupBank",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.ACCOUNT,
          ROLE.CUSTOMER,
        ],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/customBanks",
      handler: "custom-bank.findBanks",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.ACCOUNT,
          ROLE.CUSTOMER,
        ],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
