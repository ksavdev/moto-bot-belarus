export const contactMenuCommand = (bot) => {
    bot.command("contact", async (ctx) => {
        await ctx.conversation.enter("contactConversation");
    });
};
