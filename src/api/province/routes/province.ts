/**
 * province router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/provinces",
      handler: "province.create",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/provinces",
      handler: "province.find",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.CUSTOMER,
          ROLE.PUBLIC,
        ],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/provinces/:id",
      handler: "province.findOne",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.CUSTOMER,
          ROLE.PUBLIC,
        ],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/provinces/:id",
      handler: "province.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/provinces/:id",
      handler: "province.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
