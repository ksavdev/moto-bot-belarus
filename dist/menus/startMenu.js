import { Menu } from "@grammyjs/menu";
import { mainMenu } from "./mainMenu.js";
import { newbieMenu } from "./newbieMenu.js";
export const startMenu = new Menu("start-menu")
    .text("Основное меню", async (ctx) => {
    await ctx.reply(`Основное меню:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row()
    .text("Для новичков", async (ctx) => {
    await ctx.reply(`Для новичков:`, { reply_markup: newbieMenu });
    await ctx.menu.close();
})
    .row()
    // До лучших времен
    // .text("Полезные гайды", async (ctx) => {
    //   await ctx.reply(`Полезные гайды:`,
    //     { reply_markup: guideMenu });
    //   await ctx.menu.close();
    // })
    // .row()
    // .text("Лучшие маршруты по Беларуси", async (ctx) => {
    //   await ctx.reply(`Раздел в разработке...`);
    //   await ctx.menu.close();
    // })
    // .row()
    .text("Написать разработчику", async (ctx) => {
    await ctx.conversation.enter("contactConversation");
    await ctx.menu.close();
})
    .row();
