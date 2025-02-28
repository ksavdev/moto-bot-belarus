import { openDB, closeDB } from "./openDataBase.js";

export async function getMotoTuning() {
  const client = await openDB();
  try {
    const result = await client.query(`
      SELECT 
        name, 
        TRIM(category) AS category, 
        TRIM(address) AS address, 
        TRIM(link) AS link, 
        note
      FROM moto_tuning
    `);
    console.log("🔍 Данные из БД (moto_tuning):", result.rows);
    return result.rows;
  } catch (error) {
    console.error("❌ Ошибка при получении данных из БД (moto_tuning):", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}
