import { mainMenu } from "../menus/mainMenu.js";
export const startMenuCommand = (bot) => {
    bot.command("mainmenu", async (ctx) => {
        ctx.reply("Выбери, что тебе нужно из меню ниже, и я подскажу всю необходимую информацию! 🚀", { reply_markup: mainMenu });
    });
};
