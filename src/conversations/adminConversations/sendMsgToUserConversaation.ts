import { Conversation } from "@grammyjs/conversations";
import { Bot, Context } from "grammy";
import { MyContext } from "../../bot.js";

export const sendMsgToUserConversation = async (
    conversation: Conversation<MyContext, MyContext>,
    ctx: MyContext,
    bot: Bot<MyContext>
) => {
    try {
        await ctx.reply("Привет! Кому будем писать? Введи ID пользователя.");
        const userTelegramIdMessage = await conversation.waitFor("message");
        const userTelegramId = userTelegramIdMessage.message?.text?.trim();

        if (!userTelegramId || isNaN(Number(userTelegramId))) {
            await ctx.reply("Ошибка: некорректный ID пользователя. Попробуй снова.");
            return;
        }

        await ctx.reply("Введи сообщение для пользователя.");
        const messageToUserMessage = await conversation.waitFor("message");
        const messageToUser = messageToUserMessage.message?.text?.trim();

        if (!messageToUser) {
            await ctx.reply("Ошибка: сообщение не может быть пустым.");
            return;
        }

        await ctx.reply(`Окей, пишем пользователю ${userTelegramId} сообщение: ${messageToUser}`);

        // Проверяем, определён ли bot
        if (!bot || !bot.api) {
            console.error("Ошибка: bot не определён или не содержит api.");
            await ctx.reply("Ошибка: бот не был инициализирован.");
            return;
        }

        await sendMessageToUser(userTelegramId, messageToUser, bot);
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        await ctx.reply("Произошла ошибка при отправке сообщения.");
    }
};

async function sendMessageToUser(
    userTelegramId: string,
    message: string,
    bot: Bot<MyContext>
) {
    try {
        // Проверяем, есть ли bot и его API
        if (!bot || !bot.api) {
            throw new Error("Объект bot не определён или его API не доступен.");
        }

        await bot.api.sendMessage(
            Number(userTelegramId),
            `Привет! Тебе пишет разработчик бота! :) \n` +
            `Сообщение: ${message}`
        );
    } catch (error) {
        console.error("Ошибка при отправке сообщения пользователю:", error);
    }
}
