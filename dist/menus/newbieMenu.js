import { Menu } from "@grammyjs/menu";
export const newbieMenu = new Menu("newbie-menu")
    .text("1️⃣ Основное меню", async (ctx) => {
    await ctx.reply(`🔥 Стикеры доступны <a href="https://t.me/addstickers/motoxix">тут</a>`, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
})
    .row();
