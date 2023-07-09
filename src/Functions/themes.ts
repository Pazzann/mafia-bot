import {Langs} from "../types/Langs";

export interface IThemeProps{
    EN: string;
    RU?: string;
    UA?: string;
}
export class Theme implements IThemeProps{
    EN: string;
    RU?: string;
    UA?: string;
    constructor(obj: IThemeProps) {
        this.EN = obj.EN;
        this.RU = obj?.RU;
        this.UA = obj?.UA;
    }
    public GetTheme(lang: Langs){
        if(this?.[lang.toUpperCase() as keyof IThemeProps])
            return this?.[lang.toUpperCase() as keyof IThemeProps];
        else
            return this.EN;
    }
}

export default function getRandomTheme(): Theme {
    return themes[Math.floor(Math.random() * themes.length)];
}

const themes: Theme[] = [
    new Theme({
        EN: "Hiroshima August 6, 1945",
        RU: "Хиросима 6 августа 1945 год",
        UA: "Хіросіма 6 серпня 1945 рік",
    }),
    new Theme({
        EN: "In the deepest and darkest basement",
        RU: "В самом глубоком и темной подвале",
        UA: "У найглибшому та найтемнішому підвалі",
    }),
    new Theme({
        EN: "In German tank in Africa",
        RU: "В Немецком танке в Африке",
        UA: "У Німецькому танку в Африці",
    }),
    new Theme({
        EN: "Titanic April 14, 1912",
        RU: "Титаник 14 апреля 1912 год",
        UA: "Титанік 14 квітня 1912 рік",
    }),
    new Theme({
        EN: "At the gay strip club on Gagarina Avenue(Kharkiv, Ukraine)",
        RU: "В гейском стрип клубе на проспекте Гагарина",
        UA: "У гейському стрип клубі на проспекті Гагаріна",
    }),
    new Theme({
        EN: "In the dark alley",
        RU: "В темном переулке",
        UA: "У темному провульці",
    }),
    new Theme({
        EN: "Gay club",
        RU: "Гей клуб",
        UA: "Гей клуб",
    }),
    new Theme({
        EN: "Closed white room",
        RU: "Запертая белая комната",
        UA: "Зачинена біла кімната",
    }),
    new Theme({
        EN: "Hotel",
        RU: "Отель",
        UA: "Готель"
    }),
    new Theme({
        EN: "Submarine",
        RU: "Подводная лодка",
        UA: "Підводний човен",
    }),
    new Theme({
        EN: "Airplane",
        RU: "Cамолёт",
        UA: "Літак",
    }),
    new Theme({
        EN: "Whorehouse",
        RU: "Бордель",
        UA: "Бордель",
    }),
    new Theme({
        EN: "Oncology department of the hospital",
        RU: "Онкологическое отделение больницы",
        UA: "Онкологічне відділення шпиталя",
    }),
    new Theme({
        EN: "France on the night of August 24, 1572",
        RU: "Франция, в ночь 24 августа 1572",
        UA: "Франція, у ніч на 24 серпня 1572",
    }),
    new Theme({
        EN: "Gym",
        RU: "Качалка",
        UA: "Качалка",
    }),
    new Theme({
        EN: "Basement Kopaticha",
        RU: "Подвал Копатича",
        UA: "Підвал Копатича",
    }),
    new Theme({
        EN: "SS Galicia",
        RU: "СС Галичина",
        UA: "СС Галичина",
    }),
    new Theme({
        EN: "Pizzeria \"Leonardo\"",
        RU: "Пиццерия \"У Леонардо\"",
        UA: "Піцерія \"У Леонардо\"",
    }),
    new Theme({
        EN: "Casemates of the Spanish Inquisition",
        RU: "Казематы Испанской инквизиции",
        UA: "Каземати Іспанської інквізиції",
    }),
    new Theme({
        EN: "Balaklіya",
        RU: "Балаклея",
        UA: "Балаклія",
    }),
    new Theme({
        EN: "At the funeral of Elizabeth II",
        RU: "На похоронах Елизаветы II",
        UA: "На похоронах Єлизавети II",
    }),
    new Theme({
        EN: "In house with paralyzed grandfather",
        RU: "В доме с парализованным дедом",
        UA: "У будинку з паралізованим дідом",
    }),
    new Theme({
        EN: "Kremlin, February 23, 2022, 3 am",
        RU: "Кремль 23 февраля 2022, 3:00 ",
        UA: "Кремль 23 лютого 2022 року, 3:00",
    }),
    new Theme({
        EN: "In shop Spar, where was left the last candy bar Nuts",
        RU: "В магазине Шпар в котором остался последний батончик Натс",
        UA: "У магазині Шпар у якому залишився останній батончик Натс",
    }),
    new Theme({
        EN: "Fort Ross, year 1812",
        RU: "Форт Росс 1812 год",
        UA: "Форт Росс 1812 рік",
    }),
    new Theme({
        EN: "A farm near Gulaypole in 1918",
        RU: "Хутор под Гуляйполем в 1918 году",
        UA: "Хутор під Гуляйполем у 1918",
    }),
    new Theme({
        EN: "Greek-Catholic lyceum",
        RU: "Греко-Католический Лицей",
        UA: "Греко-Католицький Ліцей",
    }),
]


