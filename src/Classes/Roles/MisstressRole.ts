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
        this.ImageLink = "https://media.discordapp.net/attachments/541691734833496084/1128960594687561748/1_2.png?width=935&height=935";
        this.SelfSelectable = false;
        this._description = localisations.EN.role_mistress_description;
        this._descriptionLocals = "role_mistress_description";
    }
}