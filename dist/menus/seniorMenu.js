import { Menu } from "@grammyjs/menu";
export const seniorMenu = new Menu("senior-menu")
    .text("Лучшие маршруты по Беларуси", async (ctx) => {
    await ctx.reply(`Тут список маршрутов`);
    await ctx.menu.close();
})
    .row()
    .text("💰 Где выгодно купить мотоцикл?", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("Как купить мотоцикл из США", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("Как купить мотоцикл из Японии", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row()
    .text("🚨 Чёрный список СТО и магазинов", async (ctx) => {
    await ctx.reply(`Тут будет гайд`);
    await ctx.menu.close();
})
    .row();
