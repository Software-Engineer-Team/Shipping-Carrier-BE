import { ROLE } from "../../../helper/apiHelper";

/**
 * address router
 */
export default {
  routes: [
    {
      method: "POST",
      path: "/v1/addresses",
      handler: "address.createOneAddress",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/addresses",
      handler: "address.findManyAddresses",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/addresses/:id",
      handler: "address.delete",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/addresses/:id",
      handler: "address.findOne",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/addresses/:id",
      handler: "address.update",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
