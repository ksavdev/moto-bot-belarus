import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";
import { getEquipShops } from "../services/getEquipShops.js";
import { getEquipShopsEu } from "../services/getEquipShopsEu.js";
import { getSecondHands } from "../services/getSecondHands.js";
import { getUserServices } from "../services/getUserServices.js";
import { getTireServices } from "../services/getTireServices.js";
import { getFastFoodPlaces } from "../services/getFastFoodPlaces.js";

export const mainMenu = new Menu<MyContext>("main-menu")
  .text("🛒 Где купить новый экип (РБ)?", async (ctx) => {
    const shops = await getEquipShops();
    const shopList = shops.map(shop => `
🏬 <b>${shop.name}</b>  
📍 <i>${shop.address}</i>  
🔗 <a href="${shop.link}">Перейти</a>  
${shop.note ? `💡 <i>${shop.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(shopList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()


  .text("🌍 Где купить новый экип (Европа)?", async (ctx) => {
    const shopsEu = await getEquipShopsEu();
    const shopListEu = shopsEu.map(shop => `
🛒 <b>${shop.name}</b>  
🔗 <a href="${shop.link}">Перейти</a>  
${shop.note ? `ℹ️ <i>${shop.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(
      `${shopListEu}\n\n🚚 Если знаете, кто может доставить из Европы в Беларусь, пишите, добавим информацию.`,
      { parse_mode: "HTML", link_preview_options: { is_disabled: true } }
    );
    await ctx.menu.close();
  })
  .row()


  .text("♻ Где купить б/у экип (РБ)?", async (ctx) => {
    const secondHands = await getSecondHands();
    const secondHandsList = secondHands.map(shop => `
🏬 <b>${shop.name}</b>  
📍 <i>${shop.address}</i>  
🔗 <a href="${shop.link}">Перейти</a>  
${shop.note ? `💡 <i>${shop.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(secondHandsList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()


  .text("🔧 Мотосервисы и шиномонтаж", async (ctx) => {
    const services = await getUserServices();
    const servicesList = services.map(service => `
👤 <b>${service.username}</b>: ${service.services}`
    ).join("\n");

    await ctx.reply(servicesList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()


  .text("🍔 Где поесть (кафе для мотоциклистов)", async (ctx) => {
    const tireServices = await getTireServices();
    const tireServicesList = tireServices.map(service => `
🛠 <b>${service.name}</b>  
📍 <i>${service.address}</i>  
🔗 <a href="${service.link}">Перейти</a>  
${service.note ? `💡 <i>${service.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(tireServicesList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()


  .text("📆 Мото-мероприятия (слёты, гонки, фесты)", async (ctx) => {
    const fastFoodPlaces = await getFastFoodPlaces();
    const fastFoodPlacesList = fastFoodPlaces.map(place => `
🍽 <b>${place.name}</b>  
📍 <i>${place.address}</i>  
🔗 <a href="${place.link}">Перейти</a>  
${place.note ? `ℹ️ <i>${place.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(fastFoodPlacesList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()
  .text("💬 Чаты мотоциклистов Беларуси", async (ctx) => {
    const fastFoodPlaces = await getFastFoodPlaces();
    const fastFoodPlacesList = fastFoodPlaces.map(place => `
🍽 <b>${place.name}</b>  
📍 <i>${place.address}</i>  
🔗 <a href="${place.link}">Перейти</a>  
${place.note ? `ℹ️ <i>${place.note}</i>` : ''}`
    ).join("\n\n");

    await ctx.reply(fastFoodPlacesList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    await ctx.menu.close();
  })
  .row()