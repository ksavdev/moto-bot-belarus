import { db } from "./connectDataBase.js";
export async function createDataBase() {
    try {
        // Создание таблиц для PostgreSQL
        await db.query(`
      CREATE TABLE IF NOT EXISTS equipshops (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS second_hands (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        username TEXT,
        services TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS tire_services (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS fastfood (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS equipshops_eu (
        id SERIAL PRIMARY KEY,
        name TEXT,
        link TEXT,
        note TEXT
      );
    `);
        await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE,
        name TEXT NOT NULL
      );
    `);
        console.log("Tables created successfully in PostgreSQL.");
    }
    catch (err) {
        console.error("Error connecting to the database:", err);
    }
}
