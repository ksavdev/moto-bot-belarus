import { Bot } from "grammy";
import { MyContext } from "../bot.js";
import { newbieMenu } from "../menus/newbieMenu.js";


export const newbieMenuCommand = (bot: Bot<MyContext>) =>{
    bot.command("newbie", async (ctx) => {
        ctx.reply(
            `Для новичков:`,
            { reply_markup: newbieMenu }
        );
    });
}