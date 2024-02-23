export default defineEventHandler(async (event) => {
  const newAddress = await readBody(event);

  async function addNewAddress() {
    try {
      await knexInstance.insert(newAddress).into("addresses");
    } catch (err) {
      throw new Error((err as Error).message);
    }
    return await knexInstance("addresses").select();
  }

  addNewAddress();
  return { success: true };
});
