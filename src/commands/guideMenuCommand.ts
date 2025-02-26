import { Bot } from "grammy";
import { MyContext } from "../bot.js";
import { guideMenu } from "../menus/guideMenu.js";



export const guideMenuCommand = (bot: Bot<MyContext>) =>{
    bot.command("guide", async (ctx) => {
        ctx.reply(
            `Полезные гайды:`,
            { reply_markup: guideMenu }
        );
    });
}