import pg from "pg";
const { Client } = pg;
export async function openDB() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Включаем SSL для Railway
        },
    });
    await client.connect(); // Ожидаем подключения к базе данных
    return client; // Возвращаем клиента для выполнения запросов
}
export async function closeDB(client) {
    await client.end();
    console.log("Соединение с базой данных закрыто.");
}
