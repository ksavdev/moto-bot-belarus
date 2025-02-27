import { closeDB, openDB } from "./openDataBase.js";

export async function addEvent(eventName: string, eventDate: string, eventLink: string, eventNote: string) {
    const client = await openDB();
    try {
        await client.query(`
            INSERT INTO events (name, date, link, note)
            VALUES ($1, $2, $3, $4)
        `, [eventName, eventDate, eventLink, eventNote]);
    } catch (error) {
        console.error("❌ Ошибка при сохранении данных в БД:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}

export async function getEvents() {
    const client = await openDB();
    try {
      const result = await client.query(`
        SELECT id, name, date, TRIM(link) AS link, note FROM events
      `);
      console.log("🔍 Данные из БД:", result.rows); 
      return result.rows;
    } finally {
      await closeDB(client);
    }
  }

export async function deleteEvent(eventId: number) {
    const client = await openDB();
    try {
        await client.query(`
            DELETE FROM events WHERE id = $1
        `, [eventId]);
    } catch (error) {
        console.error("❌ Ошибка при удалении данных из БД:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}