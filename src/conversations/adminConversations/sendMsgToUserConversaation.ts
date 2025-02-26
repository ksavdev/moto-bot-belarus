import { Conversation } from "@grammyjs/conversations";
import { Bot, Context } from "grammy";
import { MyContext } from "../../bot.js";




export const sendMsgToUserConversaation = async (conversation: Conversation<MyContext, MyContext>, ctx: MyContext, bot: Bot<MyContext>) => {

    await ctx.reply("Привет! Кому будем писать? Введи ID пользователя.");
    const userTelegramIdMessage = await conversation.waitFor("message");
    const userTelegramId = userTelegramIdMessage.message?.text;
    await ctx.reply("Введи сообщение для пользователя.");
    const messageToUserMessage = await conversation.waitFor("message");
    const messageToUser = messageToUserMessage.message?.text;
    await ctx.reply(`Окей, пишем пользователю ${userTelegramId} сообщение: ${messageToUser}`);
    await conversation.external(() => sendMessageToUser(userTelegramId as string, messageToUser as string, bot));

}


async function sendMessageToUser(
    userTelegramId: number | string,
    message: string,
    bot: Bot<MyContext>
) {
    await bot.api.sendMessage(
        userTelegramId,
        `Привет! Тебе пишет разработчик бота! :) \n` +
        `Сообщение: ${message}`
    );
}
