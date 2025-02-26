import { Bot } from 'grammy'
import { MyContext } from '../bot.js';

export const setupBotCommands = (bot: Bot<MyContext>) => {
    bot.api.setMyCommands([
        { command: 'start', description: "Перезапустить бота" },
        { command: 'startmenu', description: "Главное меню" },
        { command: 'newbie', description: "Меню новичка" },
        { command: 'guide', description: "Меню гайдов" },
        { command: 'help', description: "Помощь" },
        { command: 'contact', description: "Написать разработчику" },
        // { command: 'ad', description: "Предложения по рекламе" },
    ]);
};