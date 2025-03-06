// src/services/UsersService.ts
import { openDB, closeDB } from "./connectDataBase.js"; // Скорректируйте путь под свой проект
/**
 * CREATE
 * Создаёт новую запись в таблице Users
 * Возвращает объект созданной записи (включая id и системные поля).
 */
export async function createUser(data) {
    const client = await openDB();
    try {
        // Собираем поля и значения
        const columns = [];
        const values = [];
        const userholders = [];
        let idx = 1;
        for (const [key, val] of Object.entries(data)) {
            columns.push(key);
            values.push(val);
            userholders.push(`$${idx}`);
            idx++;
        }
        const query = `
      INSERT INTO users (${columns.join(", ")})
      VALUES (${userholders.join(", ")})
      RETURNING *;
    `;
        const result = await client.query(query, values);
        // rows[0] будет содержать полную запись, включая сгенерированный id
        return result.rows[0];
    }
    catch (error) {
        console.error("Ошибка при создании users:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить все записи Users
 */
export async function getAllUsers() {
    const client = await openDB();
    try {
        const query = `
      SELECT * FROM users
      ORDER BY id ASC;
    `;
        const result = await client.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("Ошибка при получении всех users:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить запись по ID
 */
export async function getUserByTelegramId(telegram_id) {
    const client = await openDB();
    try {
        const query = `
      SELECT * FROM users
      WHERE telegram_id = $1;
    `;
        const values = [telegram_id];
        const result = await client.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при получении users по telegram_id:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * READ - получить записи с учётом фильтров (category, subcategory, is_new и т.п.)
 * Пример вызова: getUsersByFilter({ category: 'service', subcategory: 'moto_tuning' });
 */
export async function getUsersByFilter(filters) {
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
        let query = `SELECT * FROM users`;
        if (whereClauses.length > 0) {
            query += ` WHERE ` + whereClauses.join(" AND ");
        }
        query += ` ORDER BY id ASC;`;
        const result = await client.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error("Ошибка при фильтрации users:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * UPDATE - обновить запись Users по id
 */
export async function updateUser(id, data) {
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
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *;
    `;
        values.push(id);
        const result = await client.query(query, values);
        console.log(`Обновлен пользователь ${result} в базе данных`);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при обновлении users:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
/**
 * DELETE - удалить запись Users по id
 */
export async function deleteUser(id) {
    const client = await openDB();
    try {
        const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
    `;
        const values = [id];
        const result = await client.query(query, values);
        console.log(`Пользователь ${result} удален из базы данных`);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Ошибка при удалении users:", error);
        throw error;
    }
    finally {
        await closeDB(client);
    }
}
