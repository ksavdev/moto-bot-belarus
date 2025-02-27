import { openDB, closeDB } from "./openDataBase.js";
export async function getMotoTireShops() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM moto_tire_shops
    `);
        console.log("🔍 Данные из БД:", result.rows); // Логируем полученные данные
        return result.rows;
    }
    finally {
        await closeDB(client);
    }
}
