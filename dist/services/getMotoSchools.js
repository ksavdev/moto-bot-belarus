import { openDB, closeDB } from "./openDataBase.js";
export async function getMotoSchools() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT name, address, phone, TRIM(link) AS link, note FROM moto_schools;
    `);
        console.log("🔍 Данные из БД:", result.rows);
        return result.rows;
    }
    catch (error) {
        console.error("❌ Ошибка при получении данных из БД:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
