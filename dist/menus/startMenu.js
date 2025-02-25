import { Menu } from "@grammyjs/menu";
import { mainMenu } from "./mainMenu.js";
export const startMenu = new Menu("start-menu")
    .text("1️⃣ Основное меню", async (ctx) => {
    await ctx.reply(`1️⃣ Основное меню:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row()
    .text("2️⃣ Для новичков", async (ctx) => {
    await ctx.reply(`2️⃣ Для новичков:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row()
    .text("3️⃣ Для опытных мотоциклистов", async (ctx) => {
    await ctx.reply(`3️⃣ Для опытных мотоциклистов:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row()
    .text("4️⃣ Полезные гайды", async (ctx) => {
    await ctx.reply(`4️⃣ Полезные гайды:`, { reply_markup: mainMenu });
    await ctx.menu.close();
})
    .row();
