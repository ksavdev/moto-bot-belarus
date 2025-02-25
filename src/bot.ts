import dotenv from "dotenv";
dotenv.config();

import { Bot, Context } from "grammy";
import { setupBotCommands } from "./commands/commandList.js";
import { mainMenu } from "./menus/mainMenu.js";
import { startMenu } from "./menus/startMenu.js";


const bot = new Bot<MyContext>(process.env.BOT_API_KEY || "");
const MAIN_ADMIN = 890360195;

interface BotConfig {
    botDeveloper: number;
    isDeveloper: boolean;
}

export type MyContext = Context & {
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

setupBotCommands(bot)

bot.use(startMenu)
bot.use(mainMenu);


// bot.command("start", async (ctx) => {
//     if (ctx.config.isDeveloper) await ctx.reply("Привет, мам!");
//     else await ctx.reply("Добро пожаловать");
//   });

bot.command("start", async (ctx) => {
    ctx.reply("Добро пожаловать", {reply_markup : startMenu});
  });

bot.on("message", (ctx) => ctx.reply("Если у тебя возникли вопросы вызови команду /help. Чтобы написать разработчику, используй команду /contact"));

bot.start();