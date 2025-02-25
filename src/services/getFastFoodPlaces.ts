import { db } from "./connectDataBase.js";

export async function getFastFoodPlaces() {
  const result = await db.query(`
    SELECT name, address, TRIM(link) AS link, note FROM fastfood
  `);
  console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
  return result.rows;
}