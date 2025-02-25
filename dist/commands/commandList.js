export const setupBotCommands = (bot) => {
    bot.api.setMyCommands([
        { command: 'start', description: "Запуск бота" },
        { command: 'help', description: "Помощь" },
        { command: 'contact', description: "Написать разработчику" },
    ]);
};
