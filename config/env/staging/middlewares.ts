import zlib from "zlib";

export default [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::poweredBy",
    config: {
      poweredBy: "Bigsize Ship <bigsizeship.com>",
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::logger",
  {
    name: "strapi::query",
    config: {
      arrayLimit: 50,
      depth: 10,
    },
  },
  "strapi::body",
  "strapi::session",
  {
    name: "strapi::favicon",
    config: {
      path: "./favicon.png",
    },
  },
  "strapi::public",
  {
    name: "strapi::compression",
    config: {
      threadhold: 1024,
      br: false,
      gzip: {
        flush: zlib.constants.Z_SYNC_FLUSH,
        strategy: zlib.constants.Z_DEFAULT_STRATEGY,
        level: 6,
        info: true,
      },
      deflate: false,
    },
  },
];
