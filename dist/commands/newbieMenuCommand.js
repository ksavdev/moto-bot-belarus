import { seniorMenu } from "../menus/seniorMenu.js";
export const newbieMenuCommand = (bot) => {
    bot.command("senior", async (ctx) => {
        ctx.reply(`Для опытных мотоциклистов:`, { reply_markup: seniorMenu });
    });
};
