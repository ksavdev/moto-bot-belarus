import { Menu } from "@grammyjs/menu";
import { mainMenu } from "./mainMenu.js";
export const backToMainMenu = new Menu("back-to-main-menu")
    .text("◀️ Назад", async (ctx) => {
    await ctx.reply(`Основное меню:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row();
