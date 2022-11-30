import BaseRole from "./BaseRole";

export default class PoliceRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Police",
            RU: "Милиционер",
            UA: "Поліцейський"
        }
        this.RoleName = "police";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "check";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🚓', '👮', '🚔', '🚨'];
        this.SpawnFrom = 0;
        this.PlaceHolder = "Выберите кого хотите проверить...";
        this.PlaceHolderLocals = null;
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
    }
}