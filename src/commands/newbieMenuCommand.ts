import { Bot } from "grammy";
import { MyContext } from "../bot.js";

import { seniorMenu } from "../menus/seniorMenu.js";

export const newbieMenuCommand = (bot: Bot<MyContext>) =>{
    bot.command("senior", async (ctx) => {
        ctx.reply(
            `Для опытных мотоциклистов:`,
            { reply_markup: seniorMenu }
        );
    });
}