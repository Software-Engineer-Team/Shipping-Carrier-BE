/**
 * tracking router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "GET",
      path: "/v1/trackings",
      handler: "tracking.findMany",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.CUSTOMER,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.PUBLIC,
        ],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
