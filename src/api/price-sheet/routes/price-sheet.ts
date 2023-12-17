/**
 * price-sheet router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/priceSheets",
      handler: "price-sheet.create",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/priceSheets/:id",
      handler: "price-sheet.findOne",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/priceSheets",
      handler: "price-sheet.find",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/priceSheets/:id",
      handler: "price-sheet.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/priceSheets/:id",
      handler: "price-sheet.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
