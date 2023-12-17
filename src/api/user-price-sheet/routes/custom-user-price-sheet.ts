import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "POST",
      path: "/v1/userPriceSheets/calculateShipmentFees/:userId",
      handler: "custom-user-price-sheet.calculateShipmentFees",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/userPriceSheets/findPriceSheet",
      handler: "custom-user-price-sheet.findPriceSheetByUserIdAndCarrier",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/userPriceSheets/findPriceSheets/:userId",
      handler: "custom-user-price-sheet.findPriceSheetsByUserId",
      config: {
        roles: [ROLE.CUSTOMER, ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/userPriceSheets/groupByCustomer",
      handler: "custom-user-price-sheet.groupByCustomer",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
