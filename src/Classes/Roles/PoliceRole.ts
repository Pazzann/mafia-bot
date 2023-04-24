import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class PoliceRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_police_name"
        this._roleName = "police";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "check";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🔍', '🔎', '🚓', '👮', '🕵', '🚔', '🚨', '📔'];
        this.SpawnFrom = 0;
        this._placeHolder = localisations.EN.role_police_placeHolder;
        this._placeHolderLocals = "role_police_placeHolder";
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = false;
        this._description = localisations.EN.role_police_description;
        this._descriptionLocals = "role_police_description";
    }
}