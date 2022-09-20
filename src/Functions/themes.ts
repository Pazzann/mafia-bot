const themes = [
    "Хиросима 6 августа 1945 год",
    "У Антона в подвале",
    "В немецком танке в Африке",
    "В гейском стрип клубе на Гагарина",
    "Титаник 14 апреля 1912 год",
    "В темном переулке на Салтовке",
    "Гейклуб",
    "Запертая белая комната",
    "Отель",
    "Подводний човен",
    "Літак",
    "Бордель",
    "Онкологічне відділення шпиталя",
    "Франція у ніч на 24 серпня 1572",
    "Качалка",
    "Підвал Копатича",
    "Каземати Іспанської інквізиці",
    "СС Галичина",
    "Пиццерия \"У Леонардо\"",
    "В доме с парализованным дедом",
    "На берегу р.Гальгаваам",
    "Хутор під Гуляйполем у 1918",
    "Греко-Католицький Ліцей у Карачині",
    "Форт Росс 1812 год",
    "В магазине Шпар в котором остался последний батончик Натс",
    "Кремль 23 февраля 3 00",
    "На похоронах Елизаветы II",
    "Балаклея"
];

export default function GetRandomTheme(){
    return themes[Math.floor(Math.random() * themes.length)]
}