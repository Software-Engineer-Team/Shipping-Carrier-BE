const FluentClient = require("@fluent-org/logger").FluentClient;
export const FLUENT_BIT_INPUT_TAG = "bigsizeship-logger";
export const fluentLogger = new FluentClient(FLUENT_BIT_INPUT_TAG, {
  eventMode: "Forward",
  socket: {
    host: process.env.FLUENT_BIT_HOST || "localhost",
    port: 24224,
    timeout: 3000,
  },
});
