import { db } from "./connectDataBase.js";
export async function getTireServices() {
    const result = await db.query(`
    SELECT name, address, TRIM(link) AS link, note FROM tire_services
  `);
    console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
    return result.rows;
}
