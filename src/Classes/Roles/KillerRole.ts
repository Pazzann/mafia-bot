import BaseRole from "./BaseRole";

export default class KillerRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Killer",
            RU: "Маньяк",
            UA: "Ман'як"
        }
        this.RoleName = "killer";
        this.DelayForActivity = 2;
        this.ActionOnSelect = "kill";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🪓'];
        this.SpawnFrom = 8;
        this.PlaceHolder = "Выберите жертву...";
        this.PlaceHolderLocals = null;
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
    }
}