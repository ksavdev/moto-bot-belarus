import pg from "pg";
const { Client } = pg;

export default async function openDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Включаем SSL для Railway
    },
  });

  await client.connect(); // Ожидаем подключения к базе данных

  return client; // Возвращаем клиента для выполнения запросов
}
