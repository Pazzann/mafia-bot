import BaseCondition from "./BaseCondition";

export default class MafiaWin extends BaseCondition{
    constructor() {
        super();
        this._name = "Win of the mafia!";
        this._nameLocals = "condition_mafiaWin_name";
        this.WinRole = "mafia";
        this.Description = "Mafia wins when the mafia count";
        this.Condition = "{ar:mafia:count} * 2 + 1 > {aPlayerCount} ";
        this._winEmbedTitle = "condition_mafiaWin_WinEmbedTitle";
        this._winEmbedDescription = "condition_mafiaWin_WinEmbedDescription";
        this.WinEmbedThumbnail = "https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566\"";
    }
}