/**
 * carrier router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/carriers",
      handler: "carrier.create",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/carriers",
      handler: "carrier.find",
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
      path: "/v1/carriers/:id",
      handler: "carrier.findOne",
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
      method: "DELETE",
      path: "/v1/carriers/:id",
      handler: "carrier.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/carriers/:id",
      handler: "carrier.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/carriers/updateUserCarrier",
      handler: "carrier.updateUserCarrier",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
