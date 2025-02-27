import { Bot, Context } from "grammy";
import { MyContext } from "../../bot.js";
import { getEvents } from "../../services/eventsControl.js";

export const addEventCommand = (bot: Bot<MyContext>) => {
    bot.command("addevent", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            await ctx.conversation.enter("addEventConversation");
        }
    });
}

export const deleteEventCommand = (bot: Bot<MyContext>) => {
    bot.command("deleteevent", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            await ctx.conversation.enter("deleteEventConversation");
        }
    });
}

export const getEventsCommand = (bot: Bot<MyContext>) => {
    bot.command("getevents", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            const events = await getEvents();
            const eventsList = events.length > 0 ? events.map(event => `
  📆 <b>${event.name}</b>  
  📍 <i>${event.date}</i>  
  🔗 <a href="${event.link}">Перейти</a>  
  ${event.note ? `ℹ️ <i>${event.note}</i>` : ''}`
            ).join("\n\n") : "На данный момент нет ближайших мероприятий";

            await ctx.reply(eventsList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
        }
    });
}