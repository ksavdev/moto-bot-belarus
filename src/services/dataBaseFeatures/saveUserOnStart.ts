import { getUserByTelegramId, updateUser, createUser } from "../userService.js";

export async function saveUserOnStart(telegram_id: number, username: string, name: string, surname: string) {
    const user = await getUserByTelegramId(telegram_id);

    if (user) {
        // Обновляем, например, поле name (или username)
        // updateUser возвращает обновлённую запись
        const updatedUser = await updateUser(user.id, {
            username: username,
            name: name,
            surname: surname

        });
        return updatedUser;
    } else {
        // Если нет, то создаём нового
        const newUser = await createUser({
            telegram_id,
            username: username,
            name: name,
            surname: surname,
            is_blacklisted: false
        });
        return newUser;
    }
}
