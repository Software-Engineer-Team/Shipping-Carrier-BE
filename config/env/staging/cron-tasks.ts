export default {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  myJob: {
    task: ({ strapi }) => {
      strapi.log.info("Staging api still connecting...");
    },
    options: {
      rule: "1 * * * * *",
    },
  },
};
