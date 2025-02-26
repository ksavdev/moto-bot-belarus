import { Bot } from "grammy";
import { MyContext } from "../bot.js";
import { startMenu } from "../menus/startMenu.js";

export const startMenuCommand = (bot: Bot<MyContext>) =>{
    bot.command("startmenu", async (ctx) => {
        ctx.reply(
            "Выбери, что тебе нужно из меню ниже, и я подскажу всю необходимую информацию! 🚀",
            { reply_markup: startMenu }
        );
    });
}