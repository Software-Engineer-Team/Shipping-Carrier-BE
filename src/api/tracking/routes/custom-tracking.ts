import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/tracking/listenNinjavanEvent",
      handler: "tracking.listenNinjavanEvent",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/tracking/listenGhnEvent",
      handler: "tracking.listenGHNEvent",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/tracking/listenGhtkEvent",
      handler: "tracking.listenGHTKEvent",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER, ROLE.PUBLIC],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
