import { ROLE } from "../../../helper/apiHelper";

export default {
  routes: [
    {
      method: "GET",
      path: "/v1/address/province",
      handler: "address.findProvince",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/address/district/:provinceId",
      handler: "address.findDistrictByProvinceId",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/address/ward/:districtID",
      handler: "address.findWardByDistrictId",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/v1/address/searchDetail",
      handler: "address.searchAddressDetail",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/v1/address/parse",
      handler: "address.parse",
      config: {
        roles: [ROLE.ADMIN, ROLE.SALE, ROLE.CUSTOMER_CARE, ROLE.CUSTOMER],
        policies: [],
        middlewares: [],
      },
    },
  ],
};
