import { ROLE } from "../../../helper/apiHelper";
import { validateFields } from "../../../helper/excelHelper";

export function checkCalculateShipmentFeesFields(body: any) {
  const requiredFields = [
    "parcel_value",
    "from_province_code",
    "to_province_code",
    "weight",
    "has_insurance",
  ];

  return validateFields(body, requiredFields);
}

export function setQueryPriceSheet(ctx) {
  let filters = {};
  const { user } = ctx.state;
  const role = user.role;
  if (role.type.toUpperCase() === ROLE.SALE.toUpperCase()) {
    filters = { ...filters, ...{ user: { sale: user.id } } };
  } else if (role.type.toUpperCase() === ROLE.CUSTOMER.toUpperCase()) {
    filters = { ...filters, ...{ user: user.id } };
  }

  let sort = { createdAt: "desc" };
  let populate = {
    user: {
      fields: ["username", "email"],
    },
    price_sheet: {
      fields: ["name", "default"],
      populate: {
        carrier: {
          fields: ["name"],
        },
      },
    },
  };

  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }

  return {
    ...ctx.query,
    sort,
    filters,
    populate,
  };
}
