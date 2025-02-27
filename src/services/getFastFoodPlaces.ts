import { openDB, closeDB } from "./openDataBase.js";

export async function getFastFoodPlaces() {
  const client = await openDB();
  try {
    const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM fastfood
    `);
    console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
    return result.rows;
  } finally {
    await closeDB(client);
  }
}