export default defineEventHandler(() => {
  let addresses = [""];

  async function getData() {
    try {
      const data = await knexInstance("addresses").select();
      addresses = data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
    return addresses;
  }

  return getData();
});
