import { db } from "./connectDataBase.js";

export async function getEquipShopsEu() {
  const result = await db.query(`
    SELECT name, TRIM(link) AS link, note FROM equipshops_eu
  `);
  console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
  return result.rows; // PostgreSQL возвращает результат в свойстве `rows`
}
