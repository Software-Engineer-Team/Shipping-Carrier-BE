/**
 * reconciliation-order router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/reconciliationOrders",
      handler: "reconciliation-order.create",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/reconciliationOrders/upload",
      handler: "reconciliation-order.createMany",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliationOrders",
      handler: "reconciliation-order.find",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT, ROLE.SALE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliationOrders/groupByCustomer",
      handler: "reconciliation-order.groupByCustomer",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliationOrders/:id",
      handler: "reconciliation-order.findOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT, ROLE.SALE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/reconciliationOrders/:id",
      handler: "reconciliation-order.update",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
