// src/services/placesService.ts
import { openDB, closeDB } from "./connectDataBase.js"; // Скорректируйте путь под свой проект
/**
 * CREATE
 * Создаёт новую запись в таблице places
 * Возвращает объект созданной записи (включая id и системные поля).
 */
export async function createPlace(data) {
    const client = await openDB();
    try {
        // Собираем поля и значения
        const columns = [];
        const values = [];
        const placeholders = [];
        let idx = 1;
        for (const [key, val] of Object.entries(data)) {
            columns.push(key);
            values.push(val);
            placeholders.push(`$${idx}`);
            idx++;
        }
        const query = `
      INSERT INTO places (${columns.join(", ")})
      VALUES (${placeholders.join(", ")})
      RETURNING *;
    `;
        const result = await client.query(query, values);
        // rows[0] будет содержать полную запись, включая сгенерированный id
        return result.rows[0];
    }
    catch (error) {
        console.error("Ошибка при создании places:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить все записи places
 */
export async function getAllPlaces() {
    const client = await openDB();
    try {
        const query = `
      SELECT * FROM places
      ORDER BY id ASC;
    `;
        const result = await client.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("Ошибка при получении всех places:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить запись по ID
 */
export async function getPlaceById(id) {
    const client = await openDB();
    try {
        const query = `
      SELECT * FROM places
      WHERE id = $1;
    `;
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при получении places по id:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить записи с учётом фильтров (category, subcategory, is_new и т.п.)
 * Пример вызова: getPlacesByFilter({ category: 'service', subcategory: 'moto_tuning' });
 */
export async function getPlacesByFilter(filters) {
    const client = await openDB();
    try {
        const whereClauses = [];
        const values = [];
        let index = 1;
        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined) {
                whereClauses.push(`${key} = $${index}`);
                values.push(value);
                index++;
            }
        }
        let query = `SELECT * FROM places`;
        if (whereClauses.length > 0) {
            query += ` WHERE ` + whereClauses.join(" AND ");
        }
        query += ` ORDER BY id ASC;`;
        const result = await client.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error("Ошибка при фильтрации places:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * UPDATE - обновить запись places по id
 */
export async function updatePlace(id, data) {
    const client = await openDB();
    try {
        const fields = [];
        const values = [];
        let idx = 1;
        for (const [key, val] of Object.entries(data)) {
            if (val !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(val);
                idx++;
            }
        }
        if (fields.length === 0) {
            // Нечего обновлять
            return null;
        }
        const query = `
      UPDATE places
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *;
    `;
        values.push(id);
        const result = await client.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при обновлении places:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * DELETE - удалить запись places по id
 */
export async function deletePlace(id) {
    const client = await openDB();
    try {
        const query = `
      DELETE FROM places
      WHERE id = $1
      RETURNING *;
    `;
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при удалении places:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
