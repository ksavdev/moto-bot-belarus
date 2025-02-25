import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";
import { mainMenu } from "./mainMenu.js";
import { newbieMenu } from "./newbieMenu.js";
import { seniorMenu } from "./seniorMenu.js";
import { guideMenu } from "./guideMenu.js";

export const startMenu = new Menu<MyContext>("start-menu")
  .text("Основное меню", async (ctx) => {
    await ctx.reply(`Основное меню:`,
      { reply_markup: mainMenu });
    await ctx.menu.close();
  })
  .row()
  .text("Для новичков", async (ctx) => {
    await ctx.reply(`Для новичков:`,
      { reply_markup: newbieMenu });
    await ctx.menu.close();
  })
  .row()
  .text("Для опытных мотоциклистов", async (ctx) => {
    await ctx.reply(`Для опытных мотоциклистов:`,
      { reply_markup: seniorMenu });
    await ctx.menu.close();
  })
  .row()
  .text("Полезные гайды", async (ctx) => {
    await ctx.reply(`Полезные гайды:`,
      { reply_markup: guideMenu });
    await ctx.menu.close();
  })
  .row()
