import knex from "knex";
import fs from "node:fs";

const knexInstance = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  useNullAsDefault: true,
});

const initAddress = {
  name: "Első Vásárló",
  street: "Valamelyik u. 11.",
  city: "Szomszédváros",
  zipCode: 5511,
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
    return knexInstance.schema.createTable("addresses", (table) => {
      table.increments("id").primary();
      table.string("name", 30);
      table.string("street", 30);
      table.integer("zipCode");
      table.string("city", 20);
      table.string("deliveryName", 30);
      table.string("deliveryStreet", 30);
      table.integer("deliveryZipCode");
      table.string("deliveryCity", 20);
    });
  }
});

await knexInstance.insert(initAddress).into("addresses");
