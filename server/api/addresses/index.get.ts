import { Addresses } from "~/types/types";

export default defineEventHandler(() => {
  let addresses = <Addresses[]>[];

  async function getData() {
    try {
      const data = await knexInstance<Addresses>("addresses").select();
      addresses = data;
      return addresses;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return getData();
});
