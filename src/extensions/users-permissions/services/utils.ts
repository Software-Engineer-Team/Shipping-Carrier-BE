import { ROLE } from "../../../helper/apiHelper";

export function setQueryUsers(ctx) {
  const { user } = ctx.state;
  const role = user.role;

  let filters = {};
  if (role.type.toUpperCase() === ROLE.SALE.toUpperCase()) {
    filters = {
      ...filters,
      ...{ $or: [{ id: user.id }, { sale: user.id }] },
    };
  } else if (role.type.toUpperCase() === ROLE.CUSTOMER_CARE.toUpperCase()) {
    filters = {
      ...filters,
      ...{
        $and: [
          {
            role: {
              type: { $not: { $eqi: ROLE.CUSTOMER_CARE.toLowerCase() } },
            },
          },
          {
            role: { type: { $not: { $eqi: ROLE.ACCOUNT.toLowerCase() } } },
          },
        ],
      },
    };
  }

  let sort = { createdAt: "desc" };

  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }

  const populate = { role: true, sale: true, banks: true };
  return {
    ...ctx.query,
    sort,
    filters,
    populate,
  };
}
