import { closeDB, openDB } from "../../services/openDataBase.js";
export async function addEvent(eventName, eventDate, eventLink, eventNote) {
    const client = await openDB();
    try {
        await client.query(`
            INSERT INTO events (name, date, link, note)
            VALUES ($1, $2, $3, $4)
        `, [eventName, eventDate, eventLink, eventNote]);
    }
    catch (error) {
        console.error("❌ Ошибка при сохранении данных в БД:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
// function removeEvent
