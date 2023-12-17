/**
 * bank router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/banks/createMany",
      handler: "bank.createMany",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/banks",
      handler: "bank.create",
      config: {
        roles: [
          ROLE.ADMIN,
          ROLE.ACCOUNT,
          ROLE.SALE,
          ROLE.CUSTOMER_CARE,
          ROLE.CUSTOMER,
        ],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/banks",
      handler: "bank.find",
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
      path: "/v1/banks/:id",
      handler: "bank.findOne",
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
      path: "/v1/banks/:id",
      handler: "bank.delete",
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
      method: "PUT",
      path: "/v1/banks/:id",
      handler: "bank.update",
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
