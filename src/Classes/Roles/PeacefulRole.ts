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
        this.ImageLink = "https://cdn.discordapp.com/attachments/541691734833496084/1131906586659524648/b6451e192672c624.png";
        this.SelfSelectable = true;
        this._description = localisations.EN.role_peaceful_description;
        this._descriptionLocals = "role_peaceful_description";
    }
}