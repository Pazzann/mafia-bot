import BaseRole from "./BaseRole";
import {Langs} from "../../types/Langs";
import {localisations} from "../../index";

export default class DoctorRole extends BaseRole {
    constructor() {
        super()
        this.NameLocals = {
            EN: localisations.EN.role_doctor_name,
            RU: localisations.RU.role_doctor_name,
            UA: localisations.UA.role_doctor_name
        }
        this.RoleName = "doctor";
        this.DelayForActivity = 1;
        this.ActionOnSelect = "heal";
        this.GroupDecision = false;
        this.Count = 1;
        this.Emojis = ['💉', '💊', '🧬', '🦠', '🧫', '🧪', '♥'];
        this.SpawnFrom = 0;
        this.PlaceHolder = localisations.EN.role_doctor_placeHolder;
        this.PlaceHolderLocals = {
            EN: localisations.EN.role_doctor_placeHolder,
            RU: localisations.RU.role_doctor_placeHolder,
            UA: localisations.UA.role_doctor_placeHolder
        };
        this.ImageLink = "https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469";
        this.SelfSelectable = true;
        this.Description = localisations.EN.role_doctor_description;
        this.DescriptionLocals = {
            EN: localisations.EN.role_doctor_description,
            RU: localisations.RU.role_doctor_description,
            UA: localisations.UA.role_doctor_description
        };
    }
}