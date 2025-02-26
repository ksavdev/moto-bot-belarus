export const sendMsgToUser = (bot) => {
    bot.command("sendmsg", async (ctx) => {
        if (ctx.config.isDeveloper)
            await ctx.conversation.enter("sendMsgToUserConversation");
        else
            await ctx.reply("Ты не имеешь доступа к этой команде.");
    });
};
