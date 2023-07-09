import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class PeacefulRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_peaceful_name";
        this._name = "innocent";
        this.DelayForActivity = 0;
        this.ActionOnSelect = "no_activity";
        this.GroupDecision = true;
        this.Count = "{pCount}-{oRolesPCount}";
        this.SpawnFrom = 0;
        this.Emojis = null;
        this._placeHolder = null;
        this._placeHolderLocals = null;
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this._description = localisations.EN.role_peaceful_description;
        this._descriptionLocals = "role_peaceful_description";
    }
}