const fs = require("fs");

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");
  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) && {
          key: env("DATABASE_SSL_KEY", undefined),
          // cert: filePem,
          cert: undefined,
          ca: undefined,
          capath: env("DATABASE_SSL_CAPATH", undefined),
          cipher: env("DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 5),
        max: env.int("DATABASE_POOL_MAX", 20),
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 120000,
        idleTimeoutMillis: 60000,
        reapIntervalMillis: 10000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false, // <- default is true, set to false
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 120000),
    },
  };
};
