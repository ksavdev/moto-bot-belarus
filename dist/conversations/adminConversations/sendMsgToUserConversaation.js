export const sendMsgToUserConversaation = async (conversation, ctx, bot) => {
    await ctx.reply("Привет! Кому будем писать? Введи ID пользователя.");
    const userTelegramIdMessage = await conversation.waitFor("message");
    const userTelegramId = userTelegramIdMessage.message?.text;
    await ctx.reply("Введи сообщение для пользователя.");
    const messageToUserMessage = await conversation.waitFor("message");
    const messageToUser = messageToUserMessage.message?.text;
    await ctx.reply(`Окей, пишем пользователю ${userTelegramId} сообщение: ${messageToUser}, для подтверждения напиши введи /sendtouser.`);
    bot.command("sendtouser", async (ctx) => {
        if (userTelegramId && messageToUser) {
            if (ctx.config.isDeveloper) {
                await sendMessageToUser(userTelegramId, messageToUser, bot);
                await ctx.reply("Сообщение отправлено.");
            }
            else {
                await ctx.reply("Ты не имеешь доступа к этой команде.");
            }
        }
        else {
            await ctx.reply("Ошибка: не удалось получить ID пользователя или сообщение.");
        }
    });
};
async function sendMessageToUser(userTelegramId, message, bot) {
    await bot.api.sendMessage(userTelegramId, `Привет! Тебе пишет разработчик бота! :) \n` +
        `Сообщение: ${message}`);
}
