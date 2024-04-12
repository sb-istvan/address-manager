import { Address } from "~/types/types";

export default defineEventHandler(async (event) => {
  const newAddress = await readBody(event);

  async function addNewAddress() {
    try {
      await knexInstance.insert<Address>(newAddress).into("addresses");
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  addNewAddress();
  return { success: true };
});
