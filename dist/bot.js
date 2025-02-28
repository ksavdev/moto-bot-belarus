import dotenv from "dotenv";
dotenv.config();
import { autoRetry } from "@grammyjs/auto-retry";
import { Bot } from "grammy";
import { setupBotCommands } from "./commands/commandList.js";
import { conversations, createConversation, } from "@grammyjs/conversations";
import { createDataBase } from "./services/createDataBase.js";
import { saveUserInDataBase } from "./services/saveUserDataBase.js";
// Меню:
import { mainMenu } from "./menus/mainMenu.js";
import { startMenu } from "./menus/startMenu.js";
import { newbieMenu } from "./menus/newbieMenu.js";
import { guideMenu } from "./menus/guideMenu.js";
// Команды:
import { startMenuCommand } from "./commands/startMenuCommand.js";
import { newbieMenuCommand } from "./commands/newbieMenuCommand.js";
import { guideMenuCommand } from "./commands/guideMenuCommand.js";
import { helpMenuCommand } from "./commands/helpMenuCommand.js";
import { contactMenuCommand } from "./commands/contactMenuCommand.js";
// Разговоры (конверсейшны):
import { contactConversation } from "./conversations/contactConversation.js";
import { sendMsgToUser } from "./commands/adminCommands/sendMsgToUser.js";
import { sendMsgToUserConversation } from "./conversations/adminConversations/sendMsgToUserConversaation.js";
// События (админские):
import { addEventCommand, deleteEventCommand, getEventsCommand, } from "./commands/adminCommands/eventsControlCommand.js";
import { addEventConversation } from "./conversations/adminConversations/addEventConversation.js";
import { deleteEventConversation } from "./conversations/adminConversations/deleteEventConversation.js";
import { tuningMenu } from "./menus/tuningMenu.js";
const bot = new Bot(process.env.BOT_API_KEY || "");
console.log("BOT_API_KEY:", process.env.BOT_API_KEY);
bot.use(conversations());
export const MAIN_ADMIN = 890360195; // Ваш ID?
console.log("🔄 Проверка таблиц в базе данных...");
await createDataBase();
console.log("✅ База данных готова!");
console.log("✅ Бот запущен");
bot.api.config.use(autoRetry());
// Middleware для записи, админ ли пользователь
bot.use(async (ctx, next) => {
    ctx.config = {
        botDeveloper: MAIN_ADMIN,
        isDeveloper: ctx.from?.id === MAIN_ADMIN,
    };
    await next();
});
// Подключаем все разговоры
bot.use(createConversation(addEventConversation));
bot.use(createConversation(deleteEventConversation));
bot.use(createConversation(sendMsgToUserConversation));
bot.use(createConversation(contactConversation));
// Подключаем все меню
bot.use(tuningMenu);
bot.use(guideMenu);
bot.use(newbieMenu);
bot.use(mainMenu);
bot.use(startMenu);
// Регистрируем команды (или команды-обработчики)
addEventCommand(bot);
deleteEventCommand(bot);
getEventsCommand(bot);
sendMsgToUser(bot);
contactMenuCommand(bot);
helpMenuCommand(bot);
guideMenuCommand(bot);
newbieMenuCommand(bot);
startMenuCommand(bot);
setupBotCommands(bot);
// Обработчик на /start
bot.command("start", async (ctx) => {
    if (ctx.config.isDeveloper) {
        return ctx.reply(`Привет мега админ 🚀, кого забаним? 😎
Можно удалить или добавить мероприятие, а может, кому-нибудь написать? ✍️

/addevent – добавить мероприятие
/deleteevent – удалить мероприятие
/getevents – получить список мероприятий
/sendmsg – отправить сообщение пользователю
`);
    }
    // Для обычного пользователя
    await ctx.reply(`Привет, ${ctx.from?.first_name}! Я Мото Бот 🏍️. Я помогу тебе с выбором мотошколы, экипировки, сервисов и многим другим. Выбери, что тебе нужно из меню ниже! 🚀`, {
        reply_markup: startMenu, // показываем стартовое меню
    });
    // Лог в консоль
    console.log(`Пользователь:
    Имя: ${ctx.from?.first_name ?? "Не указано"}
    Фамилия: ${ctx.from?.last_name ?? "Не указано"}
    ID: ${ctx.from?.id ?? "Не указано"}
    username: ${ctx.from?.username ?? "Не указано"}
    Дата: ${new Date().toLocaleString()} запустил бота`);
    // Сохраняем в БД
    saveUserInDataBase(ctx.from?.first_name ?? "Не указано", ctx.from?.last_name ?? "Не указано", ctx.from?.id ?? 0, ctx.from?.username ?? "Не указано");
});
// Если пользователь пишет что-то без команды
bot.on("message", (ctx) => ctx.reply("Если у тебя возникли вопросы, вызови команду /help. Чтобы написать разработчику, используй команду /contact"));
// Запускаем бота
bot.start();
