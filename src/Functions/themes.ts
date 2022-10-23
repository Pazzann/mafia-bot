import IThemeProps from "../types/interfaces/ITheme";

const themes: IThemeProps[] = [
    {
        EN: "Hiroshima August 6, 1945",
        RU: "Хиросима 6 августа 1945 год",
        UA: "Хіросіма 6 серпня 1945 рік",
    },
    {
        EN: "In the deepest and darkest basement",
        RU: "В самом глубоком и темной подвале",
        UA: "У найглибшому та найтемнішому підвалі",
    },
    {
        EN: "In German tank in Africa",
        RU: "В Немецком танке в Африке",
        UA: "У Німецькому танку в Африці",
    },
    {
        EN: "Titanic April 14, 1912",
        RU: "Титаник 14 апреля 1912 год",
        UA: "Титанік 14 квітня 1912 рік",
    },
    {
        EN: "At the gay strip club on Gagarina Avenue(Kharkiv, Ukraine)",
        RU: "В гейском стрип клубе на проспекте Гагарина",
        UA: "У гейському стрип клубі на проспекті Гагаріна",
    },
    {
        EN: "In the dark alley",
        RU: "В темном переулке",
        UA: "У темному провульці",
    },
    {
        EN: "Gay club",
        RU: "Гей клуб",
        UA: "Гей клуб",
    },
    {
        EN: "Closed white room",
        RU: "Запертая белая комната",
        UA: "Зачинена біла кімната",
    },
    {
        EN: "Hotel",
        RU: "Отель",
        UA: "Готель"
    },
    {
        EN: "Submarine",
        RU: "Подводная лодка",
        UA: "Підводний човен",
    },
    {
        EN: "Airplane",
        RU: "Cамолёт",
        UA: "Літак",
    },
    {
        EN: "Whorehouse",
        RU: "Бордель",
        UA: "Бордель",
    },
    {
        EN: "Oncology department of the hospital",
        RU: "Онкологическое отделение больницы",
        UA: "Онкологічне відділення шпиталя",
    },
    {
        EN: "France on the night of August 24, 1572",
        RU: "Франция, в ночь 24 августа 1572",
        UA: "Франція, у ніч на 24 серпня 1572",
    },
    {
        EN: "Gym",
        RU: "Качалка",
        UA: "Качалка",
    },
    {
        EN: "Basement Kopaticha",
        RU: "Подвал Копатича",
        UA: "Підвал Копатича",
    },
    {
        EN: "SS Galicia",
        RU: "СС Галичина",
        UA: "СС Галичина",
    },
    {
        EN: "Pizzeria \"Leonardo\"",
        RU: "Пиццерия \"У Леонардо\"",
        UA: "Піцерія \"У Леонардо\"",
    },
    {
        EN: "Casemates of the Spanish Inquisition",
        RU: "Казематы Испанской инквизиции",
        UA: "Каземати Іспанської інквізиції",
    },
    {
        EN: "Balaklіya",
        RU: "Балаклея",
        UA: "Балаклія",
    },
    {
        EN: "At the funeral of Elizabeth II",
        RU: "На похоронах Елизаветы II",
        UA: "На похоронах Єлизавети II",
    },
    {
        EN: "In house with paralyzed grandfather",
        RU: "В доме с парализованным дедом",
        UA: "У будинку з паралізованим дідом",
    },
    {
        EN: "Kremlin, February 23, 2022, 3 am",
        RU: "Кремль 23 февраля 2022, 3:00 ",
        UA: "Кремль 23 лютого 2022 року, 3:00",
    },
    {
        EN: "In shop Spar, where was left the last candy bar Nuts",
        RU: "В магазине Шпар в котором остался последний батончик Натс",
        UA: "У магазині Шпар у якому залишився останній батончик Натс",
    },
    {
        EN: "Fort Ross, year 1812",
        RU: "Форт Росс 1812 год",
        UA: "Форт Росс 1812 рік",
    },
    {
        EN: "A farm near Gulaypole in 1918",
        RU: "Хутор под Гуляйполем в 1918 году",
        UA: "Хутор під Гуляйполем у 1918",
    },
    {
        EN: "Greek-Catholic lyceum",
        RU: "Греко-Католический Лицей",
        UA: "Греко-Католицький Ліцей",
    }
]


export default function GetRandomTheme(): IThemeProps{
    return themes[Math.floor(Math.random() * themes.length)]
}