import { closeDB, openDB } from "./openDataBase.js";
export async function saveUserInDataBase(name, surname, id, username) {
    const client = await openDB();
    try {
        await client.query(`
            INSERT INTO users (name, surname, telegramID, username)
            VALUES ($1, $2, $3, $4)
        `, [name, surname, id, username]);
    }
    catch (error) {
        console.error("❌ Ошибка при сохранении данных в БД:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
