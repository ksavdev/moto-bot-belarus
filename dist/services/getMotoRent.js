import { openDB, closeDB } from "./openDataBase.js";
export async function getMotoRent() {
    const client = await openDB();
    try {
        const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM moto_rent
    `);
        console.log("🔍 Данные из БД (аренда мото):", result.rows); // Логируем полученные данные
        return result.rows;
    }
    finally {
        await closeDB(client);
    }
}
