/**
 * user-price-sheet router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/userPriceSheets",
      handler: "user-price-sheet.create",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/userPriceSheets/:id",
      handler: "user-price-sheet.findOne",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/userPriceSheets",
      handler: "user-price-sheet.find",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/userPriceSheets/:id",
      handler: "user-price-sheet.update",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/userPriceSheets/:id",
      handler: "user-price-sheet.delete",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
