import { startMenu } from "../menus/startMenu.js";
export const startMenu = (bot) => {
    bot.command("startmenu", async (ctx) => {
        ctx.reply("Выбери, что тебе нужно из меню ниже, и я подскажу всю необходимую информацию! 🚀", { reply_markup: startMenu });
    });
};
