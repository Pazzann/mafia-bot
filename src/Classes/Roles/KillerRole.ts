import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class KillerRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_killer_name"
        this._roleName = "killer";
        this.DelayForActivity = 2;
        this.ActionOnSelect = "kill";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🪓', '🪚', '🔪', '🔨', '🪛', '🦴', '☠', '🩸'];
        this.SpawnFrom = 8;
        this._placeHolder = localisations.EN.role_killer_placeHolder;
        this._placeHolderLocals = "role_killer_placeHolder";
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this._description = localisations.EN.role_killer_description;
        this._descriptionLocals = "role_killer_description";

    }
}