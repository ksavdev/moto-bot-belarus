import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";
import { motoInspectionChecklist } from "../messages/messages.js";

export const guideMenu = new Menu<MyContext>("guide-menu")
  .text("📖 Чек-лист перед покупкой мотоцикла.", async (ctx) => {
    await ctx.reply(motoInspectionChecklist, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("💰 Где выгодно купить мотоцикл?", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()
  .text("🇺🇸 Как купить мотоцикл из США", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()
  .text("🇯🇵 Как купить мотоцикл из Японии", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()
  .text("⚙ Как подготовить мотоцикл к сезону?", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()
  .text("🌦 Как ездить в дождь, холод, жару?", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()
  .text("🏕 Как ездить в дальняки? (Что брать с собой?)", async (ctx) => {
    await ctx.reply(`Раздел в разработке...`);
    await ctx.menu.close();
  })
  .row()

