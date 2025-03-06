// src/config/translations/ru.ts
// Общий словарь перевода на русский язык.
// В коде/базе мы используем англоязычные коды, а при выводе пользователю — берем их русский аналог.
export const RU = {
    categories: {
        shop: 'Магазины/Экип',
        service: 'Сервисы',
        rent: 'Прокат',
        event: 'События/Мероприятия',
        chat: 'Чаты',
        food: 'Где поесть'
    },
    // Ниже — все возможные подкатегории для каждой категории.
    // Если понадобится, можно структурировать по категориям:
    // subcategories: {
    //   shop: {...},
    //   service: {...},
    //   ...
    // }
    // Но для простоты приводим единым словарём.
    subcategories: {
        // Для "shop"
        moto_equip_rb_new: 'Новый экип (РБ)',
        moto_equip_rb_used: 'Б/у экип (РБ)',
        moto_equip_eu_new: 'Новый экип (Европа)',
        moto_tire: 'Шины (покупка)',
        moto_consumables: 'Расходники (покупка)',
        moto_new: 'Новые мотоциклы',
        moto_used: 'Б/у мотоциклы',
        // Для "service"
        moto_service: 'Мотосервис',
        moto_tire_service: 'Шиномонтаж',
        moto_tuning: 'Тюнинг',
        moto_school: 'Мотошколы'
    }
};
//   import { RU } from './ru';
// // Предположим, где-то в коде есть category = 'shop', subcategory = 'moto_equip_rb_new'
// const categoryLabel = RU.categories[category]; // "Магазины/Экип"
// const subcategoryLabel = RU.subcategories[subcategory]; // "Новый экип (РБ)"
// console.log(`Категория: ${categoryLabel}, подкатегория: ${subcategoryLabel}`);
