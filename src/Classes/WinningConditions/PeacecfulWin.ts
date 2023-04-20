import BaseCondition from "./BaseCondition";

export default class PeacecfulWin extends BaseCondition{
    constructor() {
        super();
        this._name = "Win of the peaceful!";
        this._nameLocals = "condition_peacefulWin_name";
        this.WinRole = "innocent";
        this.Description = "Peaceful win when there is no attackers";
        this.Condition = "{aa:kill:count} == 0";
        this._winEmbedTitle = "condition_peacefulWin_WinEmbedTitle";
        this._winEmbedDescription = "condition_peacefulWin_WinEmbedDescription";
        this.WinEmbedThumbnail = "https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566\"";
    }
}