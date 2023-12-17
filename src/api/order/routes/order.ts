import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/orders",
      handler: "order.createOneOrder",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/orders/waybill/:id",
      handler: "order.creteWaybill",
      config: {
        roles: [ROLE.ADMIN],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/orders",
      handler: "order.find",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.SALE, ROLE.ADMIN, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/orders/:id",
      handler: "order.findOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/orders/:id",
      handler: "order.update",
      config: {
        roles: [ROLE.ADMIN, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/v1/orders/:id",
      handler: "order.delete",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/orders/upload",
      handler: "order.uploadOrders",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/orders/createPartialOrder/:id",
      handler: "order.createPartialOrder",
      config: {
        roles: [ROLE.ADMIN, ROLE.CUSTOMER_CARE],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
