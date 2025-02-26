import { guideMenu } from "../menus/guideMenu.js";
export const guideMenuCommand = (bot) => {
    bot.command("guide", async (ctx) => {
        ctx.reply(`Полезные гайды:`, { reply_markup: guideMenu });
    });
};
