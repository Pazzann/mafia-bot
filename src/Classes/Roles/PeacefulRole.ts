import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class PeacefulRole extends BaseRole {
    constructor() {
        super()
        this.NameLocals = {
            EN: localisations.EN.role_peaceful_name,
            RU: localisations.RU.role_peaceful_name,
            UA: localisations.UA.role_peaceful_name
        }
        this.RoleName = "innocent";
        this.DelayForActivity = 0;
        this.ActionOnSelect = "no_activity";
        this.GroupDecision = true;
        this.Count = "{pCount}-{oRolesPCount}";
        this.SpawnFrom = 0;
        this.Emojis = null;
        this.PlaceHolder = null;
        this.PlaceHolderLocals = null;
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this.Description = localisations.EN.role_peaceful_description;
        this.DescriptionLocals = {
            EN: localisations.EN.role_peaceful_description,
            RU: localisations.RU.role_peaceful_description,
            UA: localisations.UA.role_peaceful_description
        };
    }
}