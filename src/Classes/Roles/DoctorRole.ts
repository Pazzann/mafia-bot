import BaseRole from "./BaseRole";
import {Langs} from "../../types/Langs";
import {localisations} from "../../index";

export default class DoctorRole extends BaseRole{
    constructor() {
        super()
        this.NameLocals = {
            EN: "Doctor",
            RU: "Врач",
            UA: "Лікар"
        }
        this.RoleName = "doctor";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "heal";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['💉', '💊', '🧬', '🦠', '🧫', '🧪', '♥️'];
        this.SpawnFrom = 0;
        this.PlaceHolder = "Выберите кого хотите вылечить...";
        this.PlaceHolderLocals = null;
        this.ImageLink="https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
    }
}