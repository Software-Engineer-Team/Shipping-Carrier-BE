/**
 * reconciliation router
 */

import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/reconciliations/createMany",
      handler: "reconciliation.createMany",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliations",
      handler: "reconciliation.find",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT, ROLE.SALE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/reconciliations/:id",
      handler: "reconciliation.findOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT, ROLE.SALE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/reconciliations/:id",
      handler: "reconciliation.update",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/reconciliations/cancel/:id",
      handler: "reconciliation.cancelOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/reconciliations/cancels",
      handler: "reconciliation.cancelMany",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/v1/reconciliations/confirm/:id",
      handler: "reconciliation.confirmOne",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/reconciliations/confirms",
      handler: "reconciliation.confirmMany",
      config: {
        roles: [ROLE.ADMIN, ROLE.ACCOUNT],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
