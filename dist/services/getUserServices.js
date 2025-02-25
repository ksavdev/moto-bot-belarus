import { db } from "./connectDataBase.js";
export async function getUserServices() {
    const result = await db.query(`
    SELECT username, services FROM services
  `);
    console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
    return result.rows;
}
