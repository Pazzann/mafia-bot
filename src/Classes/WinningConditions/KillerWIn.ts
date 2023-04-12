import BaseCondition from "./BaseCondition";

export default class KillerWIn extends BaseCondition{
    constructor() {
        super();
        this.Name = "Killer Win!";
        this.NameLocals = null;
        this.WinRole = "killer";
        this.Description = "Mafia wins when the mafia count";
        this.Condition = "{ar:killer:count} !== 0 &&  3 > {aPlayerCount}";
        this.WinEmbedTitle = {
            EN: "Peaceful has won!",
            UA: "Мирні перемогли!",
            RU: "Мирные победили!"
        };
        this.WinEmbedDescription = "Маньяк победил";
        this.WinEmbedThumbnail = "https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566\"";
    }
}