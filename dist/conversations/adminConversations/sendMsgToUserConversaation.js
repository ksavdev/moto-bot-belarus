export const sendMsgToUserConversaation = async (conversation, ctx, bot) => {
    await ctx.reply("Привет! Кому будем писать? Введи ID пользователя.");
    const userTelegramIdMessage = await conversation.waitFor("message");
    const userTelegramId = userTelegramIdMessage.message?.text;
    await ctx.reply("Введи сообщение для пользователя.");
    const messageToUserMessage = await conversation.waitFor("message");
    const messageToUser = messageToUserMessage.message?.text;
    await ctx.reply(`Окей, пишем пользователю ${userTelegramId} сообщение: ${messageToUser}`);
    await conversation.external(() => sendMessageToUser(userTelegramId, messageToUser, bot));
};
async function sendMessageToUser(userTelegramId, message, bot) {
    await bot.api.sendMessage(userTelegramId, `Привет! Тебе пишет разработчик бота! :) \n` +
        `Сообщение: ${message}`);
}
