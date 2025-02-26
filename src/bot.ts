import dotenv from "dotenv";
dotenv.config();

import { autoRetry } from "@grammyjs/auto-retry";

import { Bot, Context } from "grammy";
import { setupBotCommands } from "./commands/commandList.js";
import { ConversationFlavor, conversations, createConversation } from "@grammyjs/conversations";
import { mainMenu } from "./menus/mainMenu.js";
import { startMenu } from "./menus/startMenu.js";
import { createDataBase } from "./services/createDataBase.js";
import { newbieMenu } from "./menus/newbieMenu.js";
import { seniorMenu } from "./menus/seniorMenu.js";
import { guideMenu } from "./menus/guideMenu.js";
import { startMenuCommand } from "./commands/startMenuCommand.js";
import { newbieMenuCommand } from "./commands/newbieMenuCommand.js";
import { seniorMenuCommand } from "./commands/seniorMenuCommand.js";
import { guideMenuCommand } from "./commands/guideMenuCommand.js";
import { helpMenuCommand } from "./commands/helpMenuCommand.js";
import { contactMenuCommand } from "./commands/contactMenuCommand.js";
import { contactConversation } from "./conversations/contactConversation.js";



const bot = new Bot<ConversationFlavor<MyContext>>(process.env.BOT_API_KEY || "");
bot.use(conversations());

export const MAIN_ADMIN = 890360195;

console.log("🔄 Проверка таблиц в базе данных...");
await createDataBase();
console.log("✅ База данных готова!");
console.log('✅ Бот запущен');

bot.api.config.use(autoRetry());

interface BotConfig {
    botDeveloper: number;
    isDeveloper: boolean;
}

export type MyContext = Context & ConversationFlavor<Context> & {
    config: BotConfig;
};

console.log("BOT_API_KEY: ", process.env.BOT_API_KEY);

bot.use(async (ctx, next) => {
    ctx.config = {
        botDeveloper: MAIN_ADMIN,
        isDeveloper: ctx.from?.id === MAIN_ADMIN,
    };
    await next();
});

bot.use(createConversation(contactConversation));


bot.use(guideMenu);
bot.use(seniorMenu);
bot.use(newbieMenu);
bot.use(mainMenu);
bot.use(startMenu)



// bot.command("start", async (ctx) => {
//     if (ctx.config.isDeveloper) await ctx.reply("Привет, мам!");
//     else await ctx.reply("Добро пожаловать");
//   });
// adMenuCommand(bot);
contactMenuCommand(bot);
helpMenuCommand(bot);
guideMenuCommand(bot);
seniorMenuCommand(bot);
newbieMenuCommand(bot);
startMenuCommand(bot);
setupBotCommands(bot)

bot.command("start", async (ctx) => {
    ctx.reply(
        "Привет! Я Мото Бот 🏍️. Я помогу тебе с выбором мотошколы, экипировки, сервисов и многим другим. Выбери, что тебе нужно из меню ниже, и я подскажу всю необходимую информацию! 🚀",
        { reply_markup: startMenu }
    );
});


bot.on("message", (ctx) => ctx.reply("Если у тебя возникли вопросы вызови команду /help. Чтобы написать разработчику, используй команду /contact"));

bot.start();