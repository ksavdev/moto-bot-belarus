import dotenv from "dotenv";
dotenv.config();
import { autoRetry } from "@grammyjs/auto-retry";
import { Bot } from "grammy";
import { setupBotCommands } from "./commands/commandList.js";
import { conversations, createConversation } from "@grammyjs/conversations";
import { mainMenu } from "./menus/mainMenu.js";
import { startMenu } from "./menus/startMenu.js";
import { createDataBase } from "./services/createDataBase.js";
import { newbieMenu } from "./menus/newbieMenu.js";
import { guideMenu } from "./menus/guideMenu.js";
import { startMenuCommand } from "./commands/startMenuCommand.js";
import { newbieMenuCommand } from "./commands/newbieMenuCommand.js";
import { guideMenuCommand } from "./commands/guideMenuCommand.js";
import { helpMenuCommand } from "./commands/helpMenuCommand.js";
import { contactMenuCommand } from "./commands/contactMenuCommand.js";
import { contactConversation } from "./conversations/contactConversation.js";
import { sendMsgToUser } from "./commands/adminCommands/sendMsgToUser.js";
import { sendMsgToUserConversation } from "./conversations/adminConversations/sendMsgToUserConversaation.js";
import { saveUserInDataBase } from "./services/saveUserDataBase.js";
const bot = new Bot(process.env.BOT_API_KEY || "");
console.log("BOT_API_KEY: ", process.env.BOT_API_KEY);
bot.use(conversations());
export const MAIN_ADMIN = 890360195;
console.log("🔄 Проверка таблиц в базе данных...");
await createDataBase();
console.log("✅ База данных готова!");
console.log('✅ Бот запущен');
bot.api.config.use(autoRetry());
bot.use(async (ctx, next) => {
    ctx.config = {
        botDeveloper: MAIN_ADMIN,
        isDeveloper: ctx.from?.id === MAIN_ADMIN,
    };
    await next();
});
bot.use(createConversation(sendMsgToUserConversation));
bot.use(createConversation(contactConversation));
bot.use(guideMenu);
bot.use(newbieMenu);
bot.use(mainMenu);
bot.use(startMenu);
sendMsgToUser(bot);
contactMenuCommand(bot);
helpMenuCommand(bot);
guideMenuCommand(bot);
newbieMenuCommand(bot);
startMenuCommand(bot);
setupBotCommands(bot);
bot.command("start", async (ctx) => {
    ctx.reply(`Привет, ${ctx.from?.first_name}! Я Мото Бот 🏍️. Я помогу тебе с выбором мотошколы, экипировки, сервисов и многим другим. Выбери, что тебе нужно из меню ниже, и я подскажу всю необходимую информацию! 🚀`, { reply_markup: startMenu });
    console.log(`Пользователь:\n
        Имя: ${ctx.from?.first_name ?? "Не указано"}\n
        Фамилия: ${ctx.from?.last_name ?? "Не указано"}\n
        ID: ${ctx.from?.id ?? "Не указано"}\n
        username: ${ctx.from?.username ?? "Не указано"}\n
        Дата: ${new Date().toLocaleString()} запустил бота`);
    saveUserInDataBase(ctx.from?.first_name ?? "Не указано", ctx.from?.last_name ?? "Не указано", ctx.from?.id ?? 0, ctx.from?.username ?? "Не указано");
});
bot.on("message", (ctx) => ctx.reply("Если у тебя возникли вопросы вызови команду /help. Чтобы написать разработчику, используй команду /contact"));
bot.start();
