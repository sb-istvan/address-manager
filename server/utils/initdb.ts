import knex from "knex";

export const knexInstance = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  useNullAsDefault: true,
});
