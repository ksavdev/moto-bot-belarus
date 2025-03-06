// src/services/placesService.ts

import { openDB, closeDB } from "./connectDataBase.js"; // Скорректируйте путь под свой проект

/**
 * Интерфейс для полного объекта в таблице places
 */
export interface IPlace {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  link: string | null;
  note: string | null;
  category: string | null;
  subcategory: string | null;
  city_id: number | null;
  is_new: boolean;
  is_blacklisted: boolean;
  created_at: Date;    // TIMESTAMP
  updated_at: Date;    // TIMESTAMP
}

/**
 * Интерфейс для создания новой записи в таблице places
 * id, created_at, updated_at - обычно ставятся СУБД автоматически
 */
export interface IPlaceCreate {
  name: string;
  address?: string;
  phone?: string;
  link?: string;
  note?: string;
  category?: string;
  subcategory?: string;
  city_id?: number;
  is_new?: boolean;
  is_blacklisted?: boolean;
}

/**
 * Интерфейс для обновления записи places
 * Все поля опциональны, так как обновить можно что угодно
 */
export interface IPlaceUpdate {
  name?: string;
  address?: string;
  phone?: string;
  link?: string;
  note?: string;
  category?: string;
  subcategory?: string;
  city_id?: number;
  is_new?: boolean;
  is_blacklisted?: boolean;
}

/**
 * CREATE
 * Создаёт новую запись в таблице places
 * Возвращает объект созданной записи (включая id и системные поля).
 */
export async function createPlace(data: IPlaceCreate): Promise<IPlace> {
  const client = await openDB();
  try {
    // Собираем поля и значения
    const columns: string[] = [];
    const values: any[] = [];
    const placeholders: string[] = [];

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

    const result = await client.query<IPlace>(query, values);
    // rows[0] будет содержать полную запись, включая сгенерированный id
    return result.rows[0];
  } catch (error) {
    console.error("Ошибка при создании places:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}

/**
 * READ - получить все записи places
 */
export async function getAllPlaces(): Promise<IPlace[]> {
  const client = await openDB();
  try {
    const query = `
      SELECT * FROM places
      ORDER BY id ASC;
    `;
    const result = await client.query<IPlace>(query);
    return result.rows;
  } catch (error) {
    console.error("Ошибка при получении всех places:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}

/**
 * READ - получить запись по ID
 */
export async function getPlaceById(id: number): Promise<IPlace | null> {
  const client = await openDB();
  try {
    const query = `
      SELECT * FROM places
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query<IPlace>(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Ошибка при получении places по id:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}

/**
 * READ - получить записи с учётом фильтров (category, subcategory, is_new и т.п.)
 * Пример вызова: getPlacesByFilter({ category: 'service', subcategory: 'moto_tuning' });
 */
export async function getPlacesByFilter(filters: Partial<IPlace>): Promise<IPlace[]> {
  const client = await openDB();
  try {
    const whereClauses: string[] = [];
    const values: any[] = [];
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

    const result = await client.query<IPlace>(query, values);
    return result.rows;
  } catch (error) {
    console.error("Ошибка при фильтрации places:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}

/**
 * UPDATE - обновить запись places по id
 */
export async function updatePlace(id: number, data: IPlaceUpdate): Promise<IPlace | null> {
  const client = await openDB();
  try {
    const fields: string[] = [];
    const values: any[] = [];
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

    const result = await client.query<IPlace>(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Ошибка при обновлении places:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}

/**
 * DELETE - удалить запись places по id
 */
export async function deletePlace(id: number): Promise<IPlace | null> {
  const client = await openDB();
  try {
    const query = `
      DELETE FROM places
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await client.query<IPlace>(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Ошибка при удалении places:", error);
    throw error;
  } finally {
    await closeDB(client);
  }
}
