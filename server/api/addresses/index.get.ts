import { Address } from "~/types/types";

export default defineEventHandler(() => {
  let addresses = <Address[]>[];

  async function getData() {
    try {
      const data = await knexInstance<Address>("addresses").select();
      addresses = data;
      return addresses;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return getData();
});
