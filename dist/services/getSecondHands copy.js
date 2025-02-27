import { openDB, closeDB } from "./openDataBase.js";
export async function getSecondHands() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM second_hands
    `);
        console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
        return result.rows;
    }
    finally {
        await closeDB(client);
    }
}
