import { openDB, closeDB } from "./openDataBase.js";

export async function getEvents() {
  const client = await openDB();
  try {
    const result = await client.query(`
      SELECT name, date, TRIM(link) AS link, note FROM events
    `);
    console.log("🔍 Данные из БД:", result.rows); 
    return result.rows;
  } finally {
    await closeDB(client);
  }
}