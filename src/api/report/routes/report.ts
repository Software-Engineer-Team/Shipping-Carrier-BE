import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "GET",
      path: "/v1/report",
      handler: "report.getReportByRole",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
