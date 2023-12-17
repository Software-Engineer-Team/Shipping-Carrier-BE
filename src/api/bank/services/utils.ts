export function setQueryBank(ctx) {
  let sort = { createdAt: "desc" };
  let filters = {};
  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }
  const populate = {};
  return {
    ...ctx.query,
    fields: ["name"],
    sort,
    filters,
    populate,
  };
}
