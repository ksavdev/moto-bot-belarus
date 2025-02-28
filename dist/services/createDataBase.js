import { openDB, closeDB } from "./openDataBase.js";
export async function createDataBase() {
    const client = await openDB();
    try {
        const tables = [
            {
                name: "equipshops",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "second_hands",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "tire_services",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "fastfood",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "equipshops_eu",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "events",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          date TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "chats",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "users",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          surname TEXT,
          telegramID TEXT,
          username TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        `
            },
            {
                name: "moto_schools",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          phone TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "shops_blacklist",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          note TEXT
        `
            },
            {
                name: "moto_shops",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT,
          is_new BOOLEAN
        `
            },
            {
                name: "moto_tire_shops",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "moto_consumables_shops",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "moto_rent",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            },
            {
                name: "moto_tuning",
                columns: `
          id SERIAL PRIMARY KEY,
          name TEXT,
          category TEXT,
          address TEXT,
          link TEXT,
          note TEXT
        `
            }
        ];
        for (const table of tables) {
            await client.query(`
        CREATE TABLE IF NOT EXISTS ${table.name} (
          ${table.columns}
        );
      `);
        }
        console.log("Таблицы успешно созданы в PostgreSQL.");
    }
    catch (err) {
        console.error("Ошибка коннекта с БД:", err);
    }
    finally {
        await closeDB(client);
    }
}
