import {EmbedBuilder} from "discord.js";
import {Langs} from "../../types/Langs";
import {ILocalProps, localisations} from "../../index";
import {ILangProps} from "../../types/interfaces/ILang";
import MafiaUser from "../MafiaUser";
import ScriptEngine from "../ScriptEngine";

export default abstract class BaseCondition {
    protected _name: string;
    protected _nameLocals: string | null = null;
    public Description: {EN: string, UA: string, RU: string} | string;
    public Condition: string;
    protected _winEmbedTitle: string;
    protected _winEmbedDescription: string;
    public WinEmbedThumbnail: string | null;
    public WinRole: "innocent" | string;

    get Name(): string {
        return this._name;
    }

    public GetName(lang: Langs): string {
        if (this._nameLocals === null)
            return this._name;
        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._nameLocals as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._nameLocals as keyof ILangProps];
        } else {
            return localisations.EN?.[this._nameLocals as keyof ILangProps];
        }
    }
    public GetEmbedTitle(lang: Langs): string {
        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._winEmbedTitle as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._winEmbedTitle as keyof ILangProps];
        } else if (localisations.EN?.[this._winEmbedTitle as keyof ILangProps]){
            return localisations.EN?.[this._winEmbedTitle as keyof ILangProps];
        }else{
            return this._winEmbedTitle;
        }
    }
    public GetEmbedDescription(lang: Langs): string {
        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._winEmbedDescription as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._winEmbedDescription as keyof ILangProps];
        } else if (localisations.EN?.[this._winEmbedDescription as keyof ILangProps]){
            return localisations.EN?.[this._winEmbedDescription as keyof ILangProps];
        }else{
            return this._winEmbedDescription;
        }
    }


    public GetEmbed(lang: Langs, players: MafiaUser[]): EmbedBuilder{
        const embed = new EmbedBuilder();
        embed.setTitle(this.GetEmbedTitle(lang));
        const description = ScriptEngine.ConditionEmbedDescription(this.GetEmbedDescription(lang), players);
        embed.setDescription(String(description));
        embed.setThumbnail(this.WinEmbedThumbnail);
        return embed;
    }
}