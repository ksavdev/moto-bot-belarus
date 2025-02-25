import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";

export const newbieMenu = new Menu<MyContext>("newbie-menu")
  .text("🏍 Как получить права на мотоцикл?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
  .text("📜 Как выбрать мотошколу?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
  .text("📍 Мотошколы в Беларуси", async (ctx) => {
    await ctx.reply(`Тут будет список потом`);
    await ctx.menu.close();
  })
  .row()
  .text("🔍 Как выбрать первый мотоцикл?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
  .text("🛡 Как выбрать экипировку?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
  .text("🛠 Как ухаживать за мотоциклом? (ТО для новичков)", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
  .text("⚠ Частые ошибки новичков", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
  })
  .row()
