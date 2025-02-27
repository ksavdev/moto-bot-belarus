import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";
import { beginnerMistakes, beginnerMotoGear, howToChooseFirstMoto, howToChooseMotoSchool, howToGetLicense, motoMaintenanceForBeginners } from "../messages/messages.js";
import { getMotoSchools } from "../services/getMotoSchools.js";

export const newbieMenu = new Menu<MyContext>("newbie-menu")
  .text("🏍 Как получить права на мотоцикл?", async (ctx) => {
    await ctx.reply(howToGetLicense, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("📜 Как выбрать мотошколу?", async (ctx) => {
    await ctx.reply(howToChooseMotoSchool, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("📍 Мотошколы в Беларуси", async (ctx) => {
    const schools = await getMotoSchools();
    const shcoolList = schools.map(school => `
🛒 <b>${school.name}</b>
📍 <i>${school.address}</i>  
📞 <i>${school.phone}</i>  
🔗 <a href="${school.link}">Перейти</a>
${school.note ? `💡 <i>${school.note}</i>` : ''}`
    ).join("\n\n");
    await ctx.reply(shcoolList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("🔍 Как выбрать первый мотоцикл?", async (ctx) => {
    await ctx.reply(howToChooseFirstMoto, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("🛡 Как выбрать экипировку?", async (ctx) => {
    await ctx.reply(beginnerMotoGear, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("🛠 Как ухаживать за мотоциклом? (ТО для новичков)", async (ctx) => {
    await ctx.reply(motoMaintenanceForBeginners, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("⚠ Частые ошибки новичков", async (ctx) => {
    await ctx.reply(beginnerMistakes, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
