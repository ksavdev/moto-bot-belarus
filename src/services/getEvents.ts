import { db } from "./connectDataBase.js";

export async function getEvents() {
  const result = await db.query(`
    SELECT name, date, TRIM(link) AS link, note FROM events
  `);
  console.log("🔍 Данные из БД:", result.rows); 
  return result.rows;
}