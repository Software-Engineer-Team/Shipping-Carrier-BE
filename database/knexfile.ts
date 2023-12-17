const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.dev") });
const {
  DATABASE_CLIENT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_SSL,
  DATABASE_POOL_MAX,
  DATABASE_POOL_MIN,
} = process.env;
const config = {
  development: {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      charset: "utf8",
    },
    pool: {
      min: Number(DATABASE_POOL_MIN),
      max: Number(DATABASE_POOL_MAX),
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: __dirname + "/migrations/dev",
    },
    seeds: {
      directory: __dirname + "/seeds/dev",
    },
  },
};

module.exports = config;
