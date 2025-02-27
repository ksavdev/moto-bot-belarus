import { openDB, closeDB } from "./openDataBase.js";
export async function getUserServices() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT username, services FROM services
    `);
        console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
        return result.rows;
    }
    finally {
        await closeDB(client);
    }
}
