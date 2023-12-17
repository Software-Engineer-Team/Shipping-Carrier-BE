/**
 * bank-account router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/bankAccounts/createMany",
      handler: "bank-account.createMany",
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
      method: "POST",
      path: "/v1/bankAccounts",
      handler: "bank-account.create",
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
      path: "/v1/bankAccounts",
      handler: "bank-account.find",
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
      path: "/v1/bankAccounts/:id",
      handler: "bank-account.findOne",
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
      path: "/v1/bankAccounts/:id",
      handler: "bank-account.delete",
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
      path: "/v1/bankAccounts/:id",
      handler: "bank-account.update",
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
