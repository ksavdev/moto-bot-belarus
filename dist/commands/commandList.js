export const setupBotCommands = (bot) => {
    bot.api.setMyCommands([
        { command: 'start', description: "Перезапустить бота" },
        { command: 'mainmenu', description: "Основное меню" },
        { command: 'newbie', description: "Меню новичка" },
        // { command: 'guide', description: "Меню гайдов" },
        { command: 'help', description: "Помощь" },
        { command: 'contact', description: "Написать разработчику" },
        // { command: 'ad', description: "Предложения по рекламе" },
    ]);
};
