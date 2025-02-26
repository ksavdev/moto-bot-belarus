import { Bot } from "grammy";
import { MyContext } from "../bot.js";




export const contactMenuCommand = (bot: Bot<MyContext>) => {
    bot.command("contact", async (ctx) => {
        await ctx.conversation.enter("contactConversation");
    });
};
