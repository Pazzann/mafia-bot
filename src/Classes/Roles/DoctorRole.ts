import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class DoctorRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_doctor_name";
        this._roleName = localisations.EN.role_doctor_name;
        this.DelayForActivity = 1;
        this.ActionOnSelect = "heal";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['💉', '💊', '🩹', '🩺', '🧬', '🦠', '🧫', '🧪', '♥'];
        this.SpawnFrom = 0;
        this._placeHolder = localisations.EN.role_doctor_placeHolder;
        this._placeHolderLocals = "role_doctor_placeHolder";
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this._description = localisations.EN.role_doctor_description;
        this._descriptionLocals = "role_doctor_description";
    }
}