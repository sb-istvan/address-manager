import knex from "knex";
import fs from "node:fs";
import { exit } from "node:process";

const knexInstance = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  useNullAsDefault: true,
});

const initAddress = {
  billingName: "Első Vásárló",
  billingStreet: "Valamelyik u. 11.",
  billingCity: "Szomszédváros",
  billingZipCode: 5511,
  deliveryName: "Ide Kérem",
  deliveryStreet: "Kiszállítós utca 54.",
  deliveryCity: "Szállítóhely",
  deliveryZipCode: 3451,
};

if (!fs.existsSync("database")) {
  fs.mkdirSync("database");
}

await knexInstance.schema.hasTable("addresses").then((exists) => {
  if (!exists) {
    console.log("creating address table...");
    return knexInstance.schema.createTable("addresses", (table) => {
      table.increments("id").primary();
      table.string("billingName", 30);
      table.string("billingStreet", 30);
      table.integer("billingZipCode");
      table.string("billingCity", 20);
      table.string("deliveryName", 30);
      table.string("deliveryStreet", 30);
      table.integer("deliveryZipCode");
      table.string("deliveryCity", 20);
    });
  }
});

await knexInstance.insert(initAddress).into("addresses");
exit(0);
