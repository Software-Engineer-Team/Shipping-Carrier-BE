module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.type === "client") {
    return true;
  }
  return 401;
};
