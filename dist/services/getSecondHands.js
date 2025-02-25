import { db } from "./connectDataBase.js";
export async function getSecondHands() {
    const result = await db.query(`
    SELECT name, address, TRIM(link) AS link, note FROM second_hands
  `);
    console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
    return result.rows;
}
