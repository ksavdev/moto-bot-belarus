import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot.js";
import { mainMenu } from "./mainMenu.js";
import { newbieMenu } from "./newbieMenu.js";
import { guideMenu } from "./guideMenu.js";

export const startMenu = new Menu<MyContext>("start-menu")
  // Переход к "Основное меню"
  .submenu("Основное меню", "main-menu")
    .row()

  // Кнопка "Для новичков"
  .submenu("Для новичков", "newbie-menu")
    .row()

  // Кнопка "Полезные гайды"
  .submenu("Полезные гайды", "guide-menu")
    .row()

  .text("Написать разработчику", async (ctx) => {
    // Переходим в разговор
    await ctx.conversation.enter("contactConversation");
    await ctx.menu.close();
  })
  .row();

// Теперь регистрируем «дочерние» меню
startMenu.register(mainMenu);
startMenu.register(newbieMenu);
startMenu.register(guideMenu);
