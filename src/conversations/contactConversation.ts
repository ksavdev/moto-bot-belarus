import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { MAIN_ADMIN, MyContext } from "../bot";

const oneHourInMilliseconds = 60 * 60 * 1000;

export const contactConversation = async (conversation: Conversation<MyContext, MyContext>, ctx: MyContext) => {
    const userTelegramId = ctx.from?.id || "Неизвестно";
    const username = ctx.from?.username || "Не указан";
    const userFirstName = ctx.from?.first_name || "Неизвестно";
    const userSurname = ctx.from?.last_name || "Не указана";

    await ctx.reply("Привет! Если у тебя есть предложения или вопросы, напиши их здесь, и я передам их разработчику.");

    const { message } = await conversation.waitFor("message", { maxMilliseconds: oneHourInMilliseconds });

    if (!message.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }

    await conversation.external(() =>
        sendMessageToAdmin(userTelegramId, username, userFirstName, userSurname, message.text as string, ctx)
    );

    await ctx.reply("Спасибо! Я передал твое сообщение разработчику.");
}

async function sendMessageToAdmin(
    userTelegramId: number | string,
    username: string,
    userFirstName: string,
    userSurname: string,
    message: string,
    bot: MyContext
) {
    await bot.api.sendMessage(
        MAIN_ADMIN,
        `Привет! Кто-то написал тебе в боте! \n` +
        `ID: ${userTelegramId}\n` +
        `Username: ${username}\n` +
        `Имя: ${userFirstName}\n` +
        `Фамилия: ${userSurname}\n` +
        `Сообщение: ${message}`
    );
}
