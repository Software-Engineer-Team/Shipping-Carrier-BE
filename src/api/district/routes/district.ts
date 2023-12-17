/**
 * district router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/districts",
      handler: "district.create",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/districts",
      handler: "district.find",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/districts/:id",
      handler: "district.findOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/districts/:id",
      handler: "district.delete",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/districts/:id",
      handler: "district.update",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
