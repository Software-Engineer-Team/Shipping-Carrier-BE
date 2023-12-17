/**
 * ward router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/wards",
      handler: "ward.create",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/wards",
      handler: "ward.find",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/wards/:id",
      handler: "ward.findOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/wards/:id",
      handler: "ward.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/wards/:id",
      handler: "ward.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
