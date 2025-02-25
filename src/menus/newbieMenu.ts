import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";

export const newbieMenu = new Menu<MyContext>("newbie-menu")
.text("1️⃣ Основное меню", async (ctx) => {
    await ctx.reply(
      `🔥 Стикеры доступны <a href="https://t.me/addstickers/motoxix">тут</a>`,
      { parse_mode: "HTML", link_preview_options: { is_disabled: true } }
    );
    await ctx.menu.close();
  })
  .row()