import {ILangProps} from "../types/interfaces/ILang";
import {Langs} from "../types/Langs";
import BaseRole from "./Roles/BaseRole";
import {ILocalProps, localisations} from "../index";
import {DMChannel, User as DiscordUser} from "discord.js";
import User from "../Entities/User.entity";

export default class MafiaUser {
    public readonly id: string;
    public readonly dsUser: DiscordUser | null;
    public readonly dbUser: User | null;
    public readonly local: ILangProps;
    public readonly lang: Langs;
    public readonly role: BaseRole;
    public isKilled: boolean = false;

    public readonly dmChannel: DMChannel;

    public actionsOnUser: {
        kill: boolean,
        heal: boolean,
        alibi: boolean,

        voted: number,
        hasVoted: boolean,
        hasDoneAction: boolean
    } = {
        kill: false,
        heal: false,
        alibi: false,

        voted: 0,
        hasVoted: false,
        hasDoneAction: false
    };
    constructor(id: string, dsUser: DiscordUser, dbUser: User, lang: Langs, role: BaseRole, dmChannel: DMChannel) {
        this.id = id;
        this.dsUser = dsUser;
        this.dbUser = dbUser;
        this.local = localisations[lang.toUpperCase() as keyof ILocalProps]
        this.lang = lang;
        this.role = role;
        this.actionsOnUser.hasDoneAction = (this.role.ActionOnSelect === "no_activity");
        this.dmChannel = dmChannel;
    }

    public clearActions() {
        this.actionsOnUser = {
            kill: false,
            heal: false,
            alibi: false,

            voted: 0,
            hasVoted: false,
            hasDoneAction: this.role.ActionOnSelect === "no_activity"
        };
    }
}