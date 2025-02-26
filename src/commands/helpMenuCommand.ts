import { Bot } from "grammy";
import { MyContext } from "../bot.js";
import { mainMenu } from "../menus/mainMenu.js";




export const helpMenuCommand = (bot: Bot<MyContext>) => {
    bot.command("help", async (ctx) => {
        ctx.reply(
            `📌 *Помощь по боту «Мото Бот Беларусь»* 🏍️\n
Я помогу тебе с выбором мотошколы, экипировки, сервисов, маршрутов и многим другим.\n
*📖 Доступные команды:*
/start - Перезапустить бота
/startmenu - Главное меню
/newbie - Меню для новичков
/senior - Меню для опытных мотоциклистов
/guide - Полезные гайды
/help - Помощь (это сообщение)
/contact - Написать разработчику\n
Выбери нужную команду или используй кнопки меню, чтобы найти необходимую информацию! 🚀`,
            { reply_markup: mainMenu, parse_mode: "Markdown" }
        );
    });
};
