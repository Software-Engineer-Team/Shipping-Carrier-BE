/**
 * carrier-account router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/carrierAccounts",
      handler: "carrier-account.create",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/carrierAccounts",
      handler: "carrier-account.find",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/carrierAccounts/:id",
      handler: "carrier-account.findOne",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/carrierAccounts/:id",
      handler: "carrier-account.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/carrierAccounts/:id",
      handler: "carrier-account.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
