import { db } from "./connectDataBase.js";
export async function getChats() {
    const result = await db.query(`
    SELECT name, TRIM(link) AS link, note FROM events
  `);
    console.log("🔍 Данные из БД:", result.rows);
    return result.rows;
}
