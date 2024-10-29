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
        RU: "Хиросима 6 августа 1945 года",
        UA: "Хіросіма 6 серпня 1945 року",
        AR: "هيروشيما 6 أغسطس 1945"
    }),
    new Theme({
        EN: "In the deepest and darkest basement",
        RU: "В самом глубоком и тёмном подвале",
        UA: "У найглибшому та найтемнішому підвалі",
        AR: "في أعمق وأظلم قبو"
    }),
    new Theme({
        EN: "In German tank in Africa",
        RU: "В немецком танке в Африке",
        UA: "У німецькому танку в Африці",
        AR: "في دبابة ألمانية في إفريقيا"
    }),
    new Theme({
        EN: "On Mars",
        RU: "На Марсе",
        UA: "На Марсі",
        AR: "في المريخ"
    }),
    new Theme({
        EN: "Egypt",
        RU: "Египет",
        UA: "Єгипет",
        AR: "في مصر"
    }),
    new Theme({
        EN: "In the dark alley",
        RU: "В тёмном переулке",
        UA: "У темному провулку",
        AR: "في زقاق مظلم"
    }),
    new Theme({
        EN: "Martyrs Park",
        RU: "Мартирз-парк",
        UA: "Мартирз-парк",
        AR: "في حديقة الشهداء"
    }),
    new Theme({
        EN: "Closed white room",
        RU: "Запертая белая комната",
        UA: "Замкнена біла кімната",
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
        RU: "Ровно в полдень",
        UA: "Рівно опівдні",
        AR: "وقت الظهيرة"
    }),
    new Theme({
        EN: "Oncology department of the hospital",
        RU: "Онкологическое отделение больницы",
        UA: "Онкологічне відділення лікарні",
        AR: "قسم الأورام في المستشفى"
    }),
    new Theme({
        EN: "Alaska",
        RU: "Аляска",
        UA: "Аляска",
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
        RU: "В офисе главы КГБ",
        UA: "В офісі голови КГБ",
        AR: "أس أس غاليسيا"
    }),
    new Theme({
        EN: "Pizzeria \"Leonardo\"",
        RU: "Пиццерия «У Леонардо»",
        UA: "Піцерія «У Леонардо»",
        AR: "بيتزا \"ليوناردو\""
    }),
    new Theme({
        EN: "Casemates of the Spanish Inquisition",
        RU: "Казематы испанской инквизиции",
        UA: "Каземати іспанської інквізиції",
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
        RU: "Нью-Йорк, США",
        UA: "Нью-Йорк, США",
        AR: "حائل, المملكة العربية السعودية"
    }),
    new Theme({
        EN: "In the Spar shop, where the last Nuts bar left",
        RU: "В магазине «Шпар», где остался последний батончик Nuts",
        UA: "У магазині «Шпар», де залишився останній батончик Nuts",
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
        RU: "Зона отчуждения",
        UA: "Зона відчуження",
        AR: "المدينة النووية"
    }),
    new Theme({
        EN: "Greek-Catholic lyceum",
        RU: "Греко-католический лицей",
        UA: "Греко-католицький ліцей",
        AR: "ثانوية يونانية كاثوليكية"
    }),
    /*
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
        EN: "Gay club",
        RU: "Гей клуб",
        UA: "Гей клуб",
    }),
    new Theme({
        EN: "Whorehouse",
        RU: "Бордель",
        UA: "Бордель",
    }),
    new Theme({
        EN: "France on the night of August 24, 1572",
        RU: "Франция, в ночь 24 августа 1572",
        UA: "Франція, у ніч на 24 серпня 1572",
    }),
    new Theme({
        EN: "SS Galicia",
        RU: "СС Галичина",
        UA: "СС Галичина",
    }),
    new Theme({
        EN: "Kremlin, February 23, 2022, 3 am",
        RU: "Кремль 23 февраля 2022, 3:00 ",
        UA: "Кремль 23 лютого 2022 року, 3:00",
    }),
    new Theme({
        EN: "A farm near Gulaypole in 1918",
        RU: "Хутор под Гуляйполем в 1918 году",
        UA: "Хутор під Гуляйполем у 1918",
    }),
    */
]



