import { Bot } from "grammy";
import { MyContext } from "../../bot.js";

export const sendMsgToUser = (bot: Bot<MyContext>) => {
    bot.command("sendmsg", async (ctx) => {
        if (ctx.config.isDeveloper) await ctx.conversation.enter("sendMsgToUserConversaation");
        else await ctx.reply("Ты не имеешь доступа к этой команде.");
    });
};
