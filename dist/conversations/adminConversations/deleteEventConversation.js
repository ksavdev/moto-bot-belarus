import { deleteEvent, getEvents } from "../../services/eventsControl.js";
export const deleteEventConversation = async (conversation, ctx) => {
    await ctx.reply(`Введите ID мероприятия, чтобы удалить его`);
    const events = await getEvents();
    const eventsList = events.length > 0 ? events.map(event => `
id: ${event.id}
<b>${event.name}</b>  
📆 <i>${event.date}</i>  
🔗 <a href="${event.link}">Перейти</a>  
${event.note ? `ℹ️ <i>${event.note}</i>` : ''}`).join("\n\n") : "На данный момент нет ближайших мероприятий";
    await ctx.reply(eventsList, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
    const { message: messageName } = await conversation.waitFor("message");
    if (!messageName.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }
    const eventID = Number(messageName.text);
    await conversation.external(() => deleteEvent(eventID));
    await ctx.reply(`Спасибо! Я удалил мероприятие "${eventID}" из базы данных.`);
};
