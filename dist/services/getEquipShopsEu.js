import { openDB, closeDB } from "./openDataBase.js";
export async function getEquipShopsEu() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT name, TRIM(link) AS link, note FROM equipshops_eu
    `);
        console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
        return result.rows; // PostgreSQL возвращает результат в свойстве `rows`
    }
    finally {
        await closeDB(client);
    }
}
