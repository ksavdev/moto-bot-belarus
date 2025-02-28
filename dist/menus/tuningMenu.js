import { Menu } from "@grammyjs/menu";
import { getMotoTuning } from "../services/getMotoTuning.js";
// Массив категорий (ключевое поле category — на английском),
// label (отображаемый на кнопке) — на русском
const tuningCategories = [
    {
        label: "🖌 Кастомная покраска и аэрография",
        category: "custom_painting"
    },
    {
        label: "💡 Тюнинг оптики и освещения",
        category: "lighting"
    },
    {
        label: "🔊 Выхлопные системы",
        category: "exhaust_systems"
    },
    {
        label: "⚙️ Усиление двигателя и прошивка ЭБУ",
        category: "engine_upgrade"
    },
    {
        label: "🛞 Подвеска и тормоза",
        category: "suspension_and_brakes"
    },
    {
        label: "🔌 Электрика и приборная панель (шкалы)",
        category: "electronics"
    },
    {
        label: "🪑 Сиденье и эргономика",
        category: "seat_and_ergonomics"
    },
    {
        label: "🎨 Декоративные элементы и наклейки",
        category: "decor"
    },
    {
        label: "🔩 Аксессуары и багажные системы",
        category: "accessories"
    },
    {
        label: "🔥 Эксклюзивные кастом-проекты",
        category: "exclusive_projects"
    }
];
// Создаём меню "tuningMenu"
export const tuningMenu = new Menu("tuning-menu");
// Проходимся по массиву категорий и для каждой делаем кнопку
tuningCategories.forEach((item) => {
    tuningMenu
        .text(item.label, async (ctx) => {
        try {
            // Получаем все услуги
            const services = await getMotoTuning();
            // Фильтруем по нужной категории (на английском)
            const filteredServices = services.filter((service) => service.category === item.category);
            // Формируем список для вывода
            const servicesList = filteredServices.length
                ? filteredServices
                    .map((service) => `
<b>${service.name}</b>
📍 <i>${service.address || "Адрес не указан"}</i>
🔗 <a href="${service.link}">Перейти</a>
${service.note ? `💡 <i>${service.note}</i>` : ""}`)
                    .join("\n\n")
                : `Услуг в категории «${item.label}» пока нет 😔`;
            // Отправляем сообщение (HTML и отключение превью)
            await ctx.reply(servicesList, {
                parse_mode: "HTML",
                link_preview_options: { is_disabled: true }
            });
        }
        catch (error) {
            await ctx.reply(`Произошла ошибка при получении списка: ${error.message}`, {
                parse_mode: "HTML",
                link_preview_options: { is_disabled: true }
            });
        }
        finally {
            // Закрываем текущее меню (возврат в предыдущее)
            await ctx.menu.close();
        }
    })
        .row(); // Каждую кнопку выводим в новой строке (можно менять расстановку)
});
tuningMenu.back("Назад");
