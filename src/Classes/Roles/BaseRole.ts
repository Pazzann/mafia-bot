import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import MafiaUser from "../MafiaUser";
import {Action} from "../../types/Action";
import {Langs} from "../../types/Langs";
import {ILangProps} from "../../types/interfaces/ILang";
import {ILocalProps, localisations} from "../../index";

export default abstract class BaseRole {
    protected _roleName: string;
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

    get RoleName(): string {
        return this._roleName;
    }

    public GetRoleName(lang: Langs): string {
        if(this._nameLocals === null)
            return this._roleName;
        if(localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._nameLocals as keyof ILangProps]){
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._nameLocals as keyof ILangProps];
        }else{
            return localisations.EN?.[this._nameLocals as keyof ILangProps];
        }
    }
    public GetPlaceHolder(lang: Langs): string {
        if(this._placeHolderLocals === null)
            return this._placeHolder;
        if(localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._placeHolderLocals as keyof ILangProps]){
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._placeHolderLocals as keyof ILangProps];
        }else{
            return localisations.EN?.[this._placeHolderLocals as keyof ILangProps];
        }
    }
    public GetDescription(lang: Langs): string {
        if(this._descriptionLocals === null)
            return this._description;
        if(localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._descriptionLocals as keyof ILangProps]){
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._descriptionLocals as keyof ILangProps];
        }else{
            return localisations.EN?.[this._descriptionLocals as keyof ILangProps];
        }
    }


    public clearSelection() {
        this.Selection = []
    }

    public GetNightVoteRow(aliveUsers: MafiaUser[], inactive = false, owner: MafiaUser) {
        if (this.ActionOnSelect == "no_activity")
            return null;
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        for (let user of aliveUsers) {
            if ((!this.SelfSelectable && user.id != owner.id) || (this.SelfSelectable)) {
                const chooser = new SelectMenuOptionBuilder()
                    .setLabel(user.dsUser.tag)
                    .setEmoji((this.Emojis)[Math.floor(Math.random() * this.Emojis.length)])
                    .setValue(user.id);
                chooseArr.push(chooser)
            }
        }
        return new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(this._roleName + "_select")
                    .setPlaceholder(this.GetPlaceHolder(owner.lang))
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(inactive),
            );
    }

    GetVoteRow(aliveUsers: MafiaUser[], inactive = false, locale: ILangProps) {
        const NonAlibiAndAliveUsers: MafiaUser[] = aliveUsers.filter(item => item.actionsOnUser.alibi === false);
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        // const skip = new SelectMenuOptionBuilder()
        //     .setLabel("Пропустить голосование")
        //     .setEmoji("▶️")
        //     .setValue("skip_vote");
        // chooseArr.push(skip);
        const Emojis: string[] = ['🗳️', '📄', '✒' , '🖋', '⏱'];

        for (let user of NonAlibiAndAliveUsers) {
            const chooser = new SelectMenuOptionBuilder()
                .setLabel(user.dsUser.tag)
                .setEmoji(Emojis[Math.floor(Math.random() * Emojis.length)])
                .setValue(user.id);
            chooseArr.push(chooser);
        }
        return new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("vote_select")
                    .setPlaceholder('Выберите, против кого вы голосуете...')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(inactive),
            );
    }

}