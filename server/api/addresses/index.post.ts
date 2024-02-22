export default defineEventHandler(async (event) => {
  const newData = await readBody(event);

  async function postNewData() {
    try {
      await knexInstance.insert(newData).into("addresses");
    } catch (err) {
      throw new Error((err as Error).message);
    }
    return await knexInstance("addresses").select();
  }

  return postNewData();
});
