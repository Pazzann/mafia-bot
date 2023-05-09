import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class MafiaRole extends BaseRole {
    constructor() {
        super()
        this._nameLocals = "role_mafia_name";
        this._roleName = "mafia";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "kill";
        this.GroupDecision = true;
        this.Count = "Math.floor({pCount}/3)";
        this.Emojis = ['🔪', '🪓', '☠️', '🩸'];
        this.SpawnFrom = 0;
        this._placeHolder = localisations.EN.role_mafia_placeHolder;
        this._placeHolderLocals = "role_mafia_placeHolder";
        this.ImageLink = "https://media.discordapp.net/attachments/541691734833496084/1103233938996088842/1.png?width=935&height=935";
        this.SelfSelectable = true;
        this._description = localisations.EN.role_mafia_description;
        this._descriptionLocals = "role_mafia_description";
    }
}