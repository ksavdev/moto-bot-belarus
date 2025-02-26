import { newbieMenu } from "../menus/newbieMenu.js";
export const newbieMenuCommand = (bot) => {
    bot.command("newbie", async (ctx) => {
        ctx.reply(`Для новичков:`, { reply_markup: newbieMenu });
    });
};
