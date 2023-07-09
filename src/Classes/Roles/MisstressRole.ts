import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class MistressRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_mistress_name";
        this._name = "mistress";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "alibi";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['♥', '💖', '🍓', '💋', '👠'];
        this.SpawnFrom = 6;
        this._placeHolder = localisations.EN.role_mistress_placeHolder;
        this._placeHolderLocals = "role_mistress_placeHolder";
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = false;
        this._description = localisations.EN.role_mistress_description;
        this._descriptionLocals = "role_mistress_description";
    }
}