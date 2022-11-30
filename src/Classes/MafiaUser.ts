import {IRolesProps} from "../types/interfaces/IRoles";
import {ILangProps} from "../types/interfaces/ILang";
import {Langs} from "../types/Langs";
import BaseRole from "./Roles/BaseRole";
import {ILocalProps, localisations} from "../index";
import {User as DiscordUser} from "discord.js";
import User from "../Entities/User";

export default class MafiaUser{
    public vote: string | null;
    public dsUser: DiscordUser;
    public dbUser: User;
    public id: string;
    public role: BaseRole;
    public local: ILangProps;
    public lang: Langs;
    public isKilled: boolean;
    public hasAlibi: boolean;
    constructor(id: string, lang: Langs, role: BaseRole, dsUser: DiscordUser, dbUser: User) {
        this.vote = null;
        this.id = id;
        this.role = role;
        this.local = localisations[lang.toUpperCase() as keyof ILocalProps]
        this.lang = lang;
        this.isKilled = false;
        this.hasAlibi = false;
        this.dsUser = dsUser;
        this.dbUser = dbUser;
    }
}