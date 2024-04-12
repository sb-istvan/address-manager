import { Address } from "~/types/types";

export default defineEventHandler(async (event) => {
  const selectedAddress = await readBody(event);
  const selectedId = selectedAddress.map((item) => item.id);

  async function deleteAddress() {
    try {
      await knexInstance("addresses").whereIn("id", selectedId).del();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  deleteAddress();
  return { success: true };
});
