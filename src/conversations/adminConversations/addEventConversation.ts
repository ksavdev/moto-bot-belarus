import { Conversation } from "@grammyjs/conversations";
import { MyContext } from "../../bot";
import { addEvent } from "../../services/eventsControl.js";

export const addEventConversation = async (conversation: Conversation<MyContext, MyContext>, ctx: MyContext) => {
    let eventName: string = 'Название мероприятия';
    let eventDate = 'Дата мероприятия';
    let eventLink = 'Ссылка на мероприятие';
    let eventNote = 'Примечание к мероприятию';

    await ctx.reply(`Введите название мероприятия`);
    const { message: messageName } = await conversation.waitFor("message");
    if (!messageName.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }
    eventName = messageName.text;

    await ctx.reply(`Введите дату мероприятия`);
    const { message: messageDate } = await conversation.waitFor("message:text");
    if (!messageDate.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }
    eventDate = messageDate.text;

    await ctx.reply(`Введите ссылку на мероприятие`);
    const { message: messageLink } = await conversation.waitFor("message:text");
    if (!messageLink.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }
    eventLink = messageLink.text;

    await ctx.reply(`Введите примечание к мероприятию`);
    const { message: messageNote } = await conversation.waitFor("message:text");
    if (!messageNote.text) {
        await ctx.reply("Ошибка: ты отправил что-то, но это не текстовое сообщение.");
        return;
    }
    eventNote = messageNote.text;

    await conversation.external(() =>
        addEvent(eventName, eventDate, eventLink, eventNote)
    );

    await ctx.reply(`Спасибо! Я добавил мероприятие "${eventName}" в базу данных.`);

};