import { closeDB, openDB } from "./openDataBase.js";

export async function saveUserInDataBase(name: string, surname: string, id: number, username: string) {
    const client = await openDB();
    try {
        await client.query(`
            INSERT INTO users (name, surname, telegramID, username)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (telegramID)
            DO UPDATE SET name = EXCLUDED.name, surname = EXCLUDED.surname, username = EXCLUDED.username
        `, [name, surname, id, username]);
    } catch (error) {
        console.error("❌ Ошибка при сохранении данных в БД:", error);
        throw error;
    } finally {
        await closeDB(client);
    }
}