import BaseCondition from "./BaseCondition";

export default class PeacecfulWin extends BaseCondition{
    constructor() {
        super();
        this.Name = "Win of the peaceful!";
        this.NameLocals = null;
        this.WinRole = "innocent";
        this.Description = "Peaceful win when there is no attackers";
        this.Condition = "{aa:kill:count} == 0";
        this.WinEmbedTitle = {
            EN: "The innocents have won!",
            UA: "Мирні перемогли!",
            RU: "Мирные победили!"
        };
        this.WinEmbedDescription = {
            EN: "The innocents have won — there are no criminals left in the city.",
            RU: "Мирные победили — преступников в городе не осталось.",
            UA: "Мирні перемогли — злочинців у місті не лишилося."
        }
        this.WinEmbedThumbnail = "https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566\"";
    }
}