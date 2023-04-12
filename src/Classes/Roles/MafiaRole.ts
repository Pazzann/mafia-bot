import BaseRole from "./BaseRole";

export default class MafiaRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Mafia",
            RU: "Мафия",
            UA: "Мафія"
        }
        this.RoleName = "mafia";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "kill";
        this.GroupDecision = true;
        this.Count = "Math.floor({pCount}/3)";
        this.Emojis = ['🔪', '🪓', '🩸'];
        this.SpawnFrom = 0;
        this.PlaceHolder = "Выберите жертву...";
        this.PlaceHolderLocals = null;
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
    }
}