import { openDB, closeDB } from "./connectDataBase.js";

export async function createDataBase() {
  const client = await openDB();
  try {
    // 1. Создаём таблицу "cities"
    await client.query(`
      CREATE TABLE IF NOT EXISTS cities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,     -- Название города
        region TEXT,            -- Регион/область
        country TEXT,           -- Страна

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Таблица "places"
    await client.query(`
      CREATE TABLE IF NOT EXISTS places (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        link TEXT,
        note TEXT,
        category TEXT,                  -- shop, service, rent, etc.
        subcategory TEXT,               -- уточнение (moto_tire, moto_tuning, etc.)
        city_id INT REFERENCES cities(id),
        is_new BOOLEAN DEFAULT false,
        is_blacklisted BOOLEAN DEFAULT false,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Таблица "chats"
    await client.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        name TEXT,
        link TEXT,
        note TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Таблица "events" (поле date делаем TIMESTAMP для даты и времени)
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT,
        date TIMESTAMP,  -- Дата/время события
        link TEXT,
        note TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Таблица "users"
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        surname TEXT,
        telegramID TEXT,
        username TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Единая функция для обновления поля updated_at
    await client.query(`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // 7. Создаём триггеры для каждой таблицы
    // При любом UPDATE поле updated_at будет устанавливаться в NOW().
    await client.query(`
      CREATE TRIGGER set_update_timestamp_cities
      BEFORE UPDATE ON cities
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);

    await client.query(`
      CREATE TRIGGER set_update_timestamp_places
      BEFORE UPDATE ON places
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);

    await client.query(`
      CREATE TRIGGER set_update_timestamp_chats
      BEFORE UPDATE ON chats
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);

    await client.query(`
      CREATE TRIGGER set_update_timestamp_events
      BEFORE UPDATE ON events
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);

    await client.query(`
      CREATE TRIGGER set_update_timestamp_users
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);

    console.log("Все таблицы созданы и триггеры для updated_at успешно добавлены.");
  } catch (err) {
    console.error("Ошибка при создании таблиц:", err);
  } finally {
    await closeDB(client);
  }
}
