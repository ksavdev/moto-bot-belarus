import { guideMenu } from "../menus/guideMenu.js";
export const guideMenuCommand = (bot) => {
    bot.command("newbie", async (ctx) => {
        ctx.reply(`Полезные гайды:`, { reply_markup: guideMenu });
    });
};
