import { openDB, closeDB } from "./openDataBase.js";
export async function createDataBase() {
    const client = await openDB();
    try {
        // Создание таблиц для PostgreSQL
        await client.query(`
      CREATE TABLE IF NOT EXISTS equipshops (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS second_hands (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS tire_services (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS fastfood (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS equipshops_eu (
        id SERIAL PRIMARY KEY,
        name TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT,
        date TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        name TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        surname TEXT,
        telegramID TEXT,
        username TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS moto_schools (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        phone TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS shops_blacklist (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        note TEXT
      );
    `);
        console.log("Таблицы успешно созданы в PostgreSQL.");
    }
    catch (err) {
        console.error("Ошибка коннекта с БД:", err);
    }
    finally {
        await closeDB(client);
    }
}
