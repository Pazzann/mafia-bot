import BaseRole from "./BaseRole";
import {localisations} from "../../index";

export default class KillerRole extends BaseRole {
    constructor() {
        super()
        this.NameLocals = {
            EN: localisations.EN.role_killer_name,
            RU: localisations.RU.role_killer_name,
            UA: localisations.UA.role_killer_name
        }
        this.RoleName = "killer";
        this.DelayForActivity = 2;
        this.ActionOnSelect = "kill";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['🪓'];
        this.SpawnFrom = 8;
        this.PlaceHolder = localisations.EN.role_killer_placeHolder;
        this.PlaceHolderLocals = {
            EN: localisations.EN.role_killer_placeHolder,
            RU: localisations.RU.role_killer_placeHolder,
            UA: localisations.UA.role_killer_placeHolder
        };
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this.Description = localisations.EN.role_killer_description;
        this.DescriptionLocals = {
            EN: localisations.EN.role_killer_description,
            RU: localisations.RU.role_killer_description,
            UA: localisations.UA.role_killer_description
        };
    }
}