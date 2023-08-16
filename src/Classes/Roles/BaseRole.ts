import {ActionRowBuilder, RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";
import MafiaUser from "../MafiaUser";
import {Action} from "../../types/Action";
import {Langs} from "../../types/Langs";
import {ILangProps} from "../../types/interfaces/ILang";
import {ILocalProps, localisations} from "../../index";

export default abstract class BaseRole {
    protected _name: string;
    protected _nameLocals: string | null = null;
    protected _placeHolder: string;
    protected _placeHolderLocals: string | null = null;
    protected _description: string;
    protected _descriptionLocals: string | null = null;
    public ActionOnSelect: Action;
    public DelayForActivity: number;
    public GroupDecision: boolean;
    public Count: number | string;
    public Emojis: string[] | null;
    public SpawnFrom: number;
    public ImageLink: string | null;
    public SelfSelectable: boolean;
    public Selection: MafiaUser[] = [];

    get name(): string {
        return this._name;
    }

    public getName(lang: Langs): string {
        if (this._nameLocals === null) {
            return this._name;
        }

        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._nameLocals as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._nameLocals as keyof ILangProps];
        } else {
            if (localisations.EN?.[this._nameLocals as keyof ILangProps]) {
                return localisations.EN?.[this._nameLocals as keyof ILangProps];
            } else {
                return this._name;
            }
        }
    }

    public getPlaceHolder(lang: Langs): string {
        if (this._placeHolderLocals === null) {
            return this._placeHolder;
        }

        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._placeHolderLocals as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._placeHolderLocals as keyof ILangProps];
        } else {
            if (localisations.EN?.[this._placeHolderLocals as keyof ILangProps]) {
                return localisations.EN?.[this._placeHolderLocals as keyof ILangProps];
            } else {
                return this._name;
            }
        }
    }

    public getDescription(lang: Langs): string {
        if (this._descriptionLocals === null) {
            return this._description;
        }

        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._descriptionLocals as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._descriptionLocals as keyof ILangProps];
        } else {
            if (localisations.EN?.[this._descriptionLocals as keyof ILangProps]) {
                return localisations.EN?.[this._descriptionLocals as keyof ILangProps];
            } else {
                return this._name;
            }
        }
    }

    public getRandomEmoji() {
        return (this.Emojis ? (this.Emojis)[Math.floor(Math.random() * this.Emojis.length)] : null);
    }

    public clearSelection() {
        this.Selection = [];
    }

    public getNightVoteRow(aliveUsers: MafiaUser[], owner: MafiaUser, inactive = false) {
        if (this.ActionOnSelect == "no_activity") {
            return null;
        }

        const options: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let user of aliveUsers) {
            if (this.SelfSelectable || (!this.SelfSelectable && user.id !== owner.id)) {
                const option = new StringSelectMenuOptionBuilder()
                    .setLabel(user.dsUser.tag)
                    .setEmoji(this.getRandomEmoji())
                    .setValue(user.id);
                options.push(option);
            }
        }

        return new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(this._name + "_select")
                    .setPlaceholder(this.getPlaceHolder(owner.lang))
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(options)
                    .setDisabled(inactive)
            );
    }

    GetVoteRow(aliveUsers: MafiaUser[], inactive = false, locale: ILangProps) {
        const NonAlibiAndAliveUsers: MafiaUser[] = aliveUsers.filter(item => item.actionsOnUser.alibi === false);
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        // const skip = new StringSelectMenuOptionBuilder()
        //     .setLabel("Пропустить голосование")
        //     .setEmoji("▶️")
        //     .setValue("skip_vote");
        // chooseArr.push(skip);
        const Emojis: string[] = ['🗳️', '📄', '📝', '🖋', '🖊', '✏️'];

        for (let user of NonAlibiAndAliveUsers) {
            const chooser = new StringSelectMenuOptionBuilder()
                .setLabel(user.dsUser.tag)
                .setEmoji(Emojis[Math.floor(Math.random() * Emojis.length)])
                .setValue(user.id);
            chooseArr.push(chooser);
        }
        return new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("vote_select")
                    .setPlaceholder(locale.role_vote_select_placeHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(inactive),
            );
    }
}