import BaseRole from "./BaseRole";

export default class PeacefulRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Innocent",
            RU: "Мирный",
            UA: "Мирний"
        }
        this.RoleName = "innocent";
        this.DelayForActivity = 0;
        this.ActionOnSelect = "no_activity";
        this.GroupDecision = false;
        this.Count = "{pCount}-{oRolesPCount}";
        this.SpawnFrom = 0;
        this.Emojis = null;
        this.PlaceHolderLocals = null;
        this.PlaceHolder = "A";
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
    }
}