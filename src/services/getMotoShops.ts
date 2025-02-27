import { openDB, closeDB } from "./openDataBase.js";

export async function getUsedMotoShops() {
  const client = await openDB();
  try {
    const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM moto_shops WHERE is_new = false
    `);
    console.log("🔍 Данные из БД (б/у мотоциклы):", result.rows); // Логируем полученные данные
    return result.rows;
  } finally {
    await closeDB(client);
  }
}

export async function getNewMotoShops() {
  const client = await openDB();
  try {
    const result = await client.query(`
      SELECT name, address, TRIM(link) AS link, note FROM moto_shops WHERE is_new = true
    `);
    console.log("🔍 Данные из БД (новые мотоциклы):", result.rows); // Логируем полученные данные
    return result.rows;
  } finally {
    await closeDB(client);
  }
}

