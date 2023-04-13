import BaseRole from "./BaseRole";

export default class MistressRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Mistress",
            RU: "Шлюха",
            UA: "Шмара"
        }
        this.RoleName = "mistress";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "alibi";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['♥️'];
        this.SpawnFrom = 6;
        this.PlaceHolder = "Выберите к кому хотите сходить...";
        this.PlaceHolderLocals = null;
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = false;
        this.Description = "%You know what to do ;)!%";

    }
}