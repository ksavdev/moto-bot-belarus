import { getEvents } from "../../services/eventsControl.js";
export const addEventCommand = (bot) => {
    bot.command("addevent", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            await ctx.conversation.enter("addEventConversation");
        }
    });
};
export const deleteEventCommand = (bot) => {
    bot.command("deleteevent", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            await ctx.conversation.enter("deleteEventConversation");
        }
    });
};
export const getEventsCommand = (bot) => {
    bot.command("getevents", async (ctx) => {
        if (!ctx.config.isDeveloper) {
            return ctx.reply("❌ У вас нет доступа к этой команде!");
        }
        else {
            const events = await getEvents();
            const eventsList = events.map(event => `
            id: <b>${event.id}</b>
            📆 <b>${event.name}</b>  
            📍 <i>${event.date}</i>  
            🔗 <a href="${event.link}">Перейти</a>  
            ${event.note ? `ℹ️ <i>${event.note}</i>` : ''}`).join("\n\n");
            await ctx.reply(eventsList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
        }
    });
};
