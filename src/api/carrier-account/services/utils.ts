export function setQueryCarrierAccount(ctx) {
  let filters = {};
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

  return {
    ...ctx.query,
    sort,
    filters,
  };
}
