import { Bot } from 'grammy'
import { MyContext } from '../bot.js';

export const setupBotCommands = (bot: Bot<MyContext>) => {
    bot.api.setMyCommands([
        { command: 'start', description: "Запуск бота" },
        { command: 'help', description: "Помощь" },
        { command: 'contact', description: "Написать разработчику" },
        
    ]);
};