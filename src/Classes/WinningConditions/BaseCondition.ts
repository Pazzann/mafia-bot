import {EmbedBuilder} from "discord.js";
import {Langs} from "../../types/Langs";

export default abstract class BaseCondition{
    public Name: string;
    public NameLocals: {EN:string, UA: string, RU: string} | null;
    public Description: {EN: string, UA: string, RU: string} | string;
    public Condition: string;
    public WinEmbedTitle: {EN: string, UA: string, RU: string} | string;
    public WinEmbedDescription: {EN: string, UA: string, RU: string} | string
    public WinEmbedThumbnail: string | null;
    public GetEmbed(lang: Langs): EmbedBuilder{
        const embed = new EmbedBuilder();
        if(typeof this.WinEmbedTitle !== "string"){
            embed.setTitle(this.WinEmbedTitle[lang.toUpperCase() as keyof {EN: string, UA: string, RU: string}]);
        }else{
            embed.setTitle(this.WinEmbedTitle);
        }
        if(typeof this.WinEmbedDescription !== "string"){
            embed.setDescription(this.WinEmbedDescription[lang.toUpperCase() as keyof {EN: string, UA: string, RU: string}]);
        }else{
            embed.setTitle(this.WinEmbedDescription);
        }
        embed.setThumbnail(this.WinEmbedThumbnail);
        return embed;
    }
}