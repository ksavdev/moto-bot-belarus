import { Menu } from "@grammyjs/menu";
export const guideMenu = new Menu("guide-menu")
    .text("📖 Чек-лист перед покупкой мотоцикла", async (ctx) => {
    await ctx.reply(`Тут чеклист`);
    await ctx.menu.close();
})
    .row()
    .text("💰 Где выгодно купить мотоцикл?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("🇺🇸 Как купить мотоцикл из США", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("🇯🇵 Как купить мотоцикл из Японии", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("⚙ Как подготовить мотоцикл к сезону?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("🌦 Как ездить в дождь, холод, жару?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("🏕 Как ездить в дальняки? (Что брать с собой?)", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row();
