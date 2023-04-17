import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class PoliceRole extends BaseRole {
    constructor() {
        super()
        this.NameLocals = {
            EN: localisations.EN.role_police_name,
            RU: localisations.RU.role_police_name,
            UA: localisations.UA.role_police_name
        }
        this.RoleName = "police";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "check";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🔍', '🔎', '🚓', '👮', '🚔', '🚨'];
        this.SpawnFrom = 0;
        this.PlaceHolder = localisations.EN.role_police_placeHolder;
        this.PlaceHolderLocals = {
            EN: localisations.EN.role_police_placeHolder,
            RU: localisations.RU.role_police_placeHolder,
            UA: localisations.UA.role_police_placeHolder
        };
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = false;
        this.Description = localisations.EN.role_police_description;
        this.DescriptionLocals = {
            EN: localisations.EN.role_police_description,
            RU: localisations.RU.role_police_description,
            UA: localisations.UA.role_police_description
        };
    }
}