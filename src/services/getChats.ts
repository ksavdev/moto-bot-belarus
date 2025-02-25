import { db } from "./connectDataBase.js";

export async function getChats() {
  try {
    const result = await db.query(`
      SELECT name, TRIM(link) AS link, note FROM chats
    `);
    console.log("🔍 Данные из БД:", result.rows); 
    return result.rows;
  } catch (error) {
    console.error("❌ Ошибка при получении данных из БД:", error);
    throw error;
  }
}