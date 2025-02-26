export const sendMsgToUserConversation = async (conversation, ctx, bot) => {
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
        await sendMessageToUser(userTelegramId, messageToUser, bot);
    }
    catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        await ctx.reply("Произошла ошибка при отправке сообщения.");
    }
};
async function sendMessageToUser(userTelegramId, message, bot) {
    try {
        await bot.api.sendMessage(Number(userTelegramId), `Привет! Тебе пишет разработчик бота! :) \n` +
            `Сообщение: ${message}`);
    }
    catch (error) {
        console.error("Ошибка при отправке сообщения пользователю:", error);
    }
}
