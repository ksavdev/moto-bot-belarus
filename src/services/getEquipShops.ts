import { db } from "./connectDataBase.js";

export async function getEquipShops() {
  const result = await db.query(`
    SELECT name, address, TRIM(link) AS link, note FROM equipshops
  `);
  console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
  return result.rows; // PostgreSQL возвращает результат в свойстве `rows`
}
