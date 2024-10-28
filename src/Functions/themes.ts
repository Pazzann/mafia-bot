import {Langs} from "../types/Langs";

export interface IThemeProps{
    EN: string;
    RU?: string;
    UA?: string;
    AR?: string;
}
export class Theme implements IThemeProps{
    EN: string;
    RU?: string;
    UA?: string;
    AR?: string;
    constructor(obj: IThemeProps) {
        this.EN = obj.EN;
        this.RU = obj?.RU;
        this.UA = obj?.UA;
        this.AR = obj?.AR;
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
        AR: "هيروشيما 6 أغسطس 1945"
    }),
    new Theme({
        EN: "In the deepest and darkest basement",
        RU: "В самом глубоком и темной подвале",
        UA: "У найглибшому та найтемнішому підвалі",
        AR: "في أعمق وأظلم قبو"
    }),
    new Theme({
        EN: "In German tank in Africa",
        RU: "В Немецком танке в Африке",
        UA: "У Німецькому танку в Африці",
        AR: "في دبابة ألمانية في إفريقيا"
    }),
    new Theme({
        EN: "On Mars",
        RU: "Титаник 14 апреля 1912 год",
        UA: "Титанік 14 квітня 1912 рік",
        AR: "في المريخ"
    }),
    new Theme({
        EN: "Egypt",
        RU: "В гейском стрип клубе на проспекте Гагарина",
        UA: "У гейському стрип клубі на проспекті Гагаріна",
        AR: "في مصر"
    }),
    new Theme({
        EN: "In the dark alley",
        RU: "В темном переулке",
        UA: "У темному провульці",
        AR: "في زقاق مظلم"
    }),
    new Theme({
        EN: "Martyrs Park",
        RU: "Гей клуб",
        UA: "Гей клуб",
        AR: "في حديقة الشهداء"
    }),
    new Theme({
        EN: "Closed white room",
        RU: "Запертая белая комната",
        UA: "Зачинена біла кімната",
        AR: "غرفة بيضاء مغلقة"
    }),
    new Theme({
        EN: "Hotel",
        RU: "Отель",
        UA: "Готель",
        AR: "فندق"
    }),
    new Theme({
        EN: "Submarine",
        RU: "Подводная лодка",
        UA: "Підводний човен",
        AR: "غواصة"
    }),
    new Theme({
        EN: "Airplane",
        RU: "Cамолёт",
        UA: "Літак",
        AR: "طائرة"
    }),
    new Theme({
        EN: "High noon",
        RU: "Бордель",
        UA: "Бордель",
        AR: "وقت الظهيرة"
    }),
    new Theme({
        EN: "Oncology department of the hospital",
        RU: "Онкологическое отделение больницы",
        UA: "Онкологічне відділення шпиталя",
        AR: "قسم الأورام في المستشفى"
    }),
    new Theme({
        EN: "Alaska",
        RU: "Франция, в ночь 24 августа 1572",
        UA: "Франція, у ніч на 24 серпня 1572",
        AR: "القدس, عاصمة فلسطين"
    }),
    new Theme({
        EN: "Gym",
        RU: "Качалка",
        UA: "Качалка",
        AR: "صالة رياضية"
    }),
    new Theme({
        EN: "Basement Kopaticha",
        RU: "Подвал Копатича",
        UA: "Підвал Копатича",
        AR: "قبو كوباتيتشا"
    }),
    new Theme({
        EN: "In the office of the head of the KGB",
        RU: "СС Галичина",
        UA: "СС Галичина",
        AR: "أس أس غاليسيا"
    }),
    new Theme({
        EN: "Pizzeria \"Leonardo\"",
        RU: "Пиццерия \"У Леонардо\"",
        UA: "Піцерія \"У Леонардо\"",
        AR: "بيتزا \"ليوناردو\""
    }),
    new Theme({
        EN: "Casemates of the Spanish Inquisition",
        RU: "Казематы Испанской инквизиции",
        UA: "Каземати Іспанської інквізиції",
        AR: "زنزانات محاكم التفتيش الإسبانية"
    }),
    new Theme({
        EN: "Balaklіya",
        RU: "Балаклея",
        UA: "Балаклія",
        AR: "بالاكليا"
    }),
    new Theme({
        EN: "At the funeral of Elizabeth II",
        RU: "На похоронах Елизаветы II",
        UA: "На похоронах Єлизавети II",
        AR: "في جنازة إليزابيث الثانية"
    }),
    new Theme({
        EN: "In house with paralyzed grandfather",
        RU: "В доме с парализованным дедом",
        UA: "У будинку з паралізованим дідом",
        AR: "في منزل مع جد مشلول"
    }),
    new Theme({
        EN: "New York City, USA",
        RU: "Кремль 23 февраля 2022, 3:00 ",
        UA: "Кремль 23 лютого 2022 року, 3:00",
        AR: "حائل, المملكة العربية السعودية"
    }),
    new Theme({
        EN: "In shop Spar, where was left the last candy bar Nuts",
        RU: "В магазине Шпар в котором остался последний батончик Натс",
        UA: "У магазині Шпар у якому залишився останній батончик Натс",
        AR: "في متجر سبار حيث بقيت آخر قطعة شوكولاتة نوتس"
    }),
    new Theme({
        EN: "Fort Ross, year 1812",
        RU: "Форт Росс 1812 год",
        UA: "Форт Росс 1812 рік",
        AR: "فورت روس، عام 1812"
    }),
    new Theme({
        EN: "Nuke city",
        RU: "Хутор под Гуляйполем в 1918 году",
        UA: "Хутор під Гуляйполем у 1918",
        AR: "المدينة النووية"
    }),
    new Theme({
        EN: "Greek-Catholic lyceum",
        RU: "Греко-Католический Лицей",
        UA: "Греко-Католицький Ліцей",
        AR: "ثانوية يونانية كاثوليكية"
    }),
]



