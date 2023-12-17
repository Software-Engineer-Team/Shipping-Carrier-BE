export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 10000,
    withCount: true,
  },
  auditLogs: {
    enabled: true,
  },
  responses: {
    privateAttributes: ["password"],
  },
};
