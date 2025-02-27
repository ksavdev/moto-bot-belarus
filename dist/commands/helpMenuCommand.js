import { mainMenu } from "../menus/mainMenu.js";
export const helpMenuCommand = (bot) => {
    bot.command("help", async (ctx) => {
        ctx.reply(`📌 *Помощь по боту «Мото Бот Беларусь»* 🏍️\n
Я помогу тебе с выбором мотошколы, экипировки, сервисов, маршрутов и многим другим.\n
*📖 Доступные команды:*
/start - Перезапустить бота
/mainmenu - Основное меню
/newbie - Меню для новичков
/help - Помощь (это сообщение)
/contact - Написать разработчику\n
Выбери нужную команду или используй кнопки меню, чтобы найти необходимую информацию! 🚀`, { reply_markup: mainMenu, parse_mode: "Markdown" });
    });
};
