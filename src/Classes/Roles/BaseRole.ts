import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import MafiaUser from "../MafiaUser";

export default abstract class BaseRole{
    public RoleName: string;
    public NameLocals: {EN: string, UA: string, RU: string} | null;
    public ActionOnSelect: "kill" | "heal" | "alibi" | "check" | "full_check" | "no_activity";
    public DelayForActivity: number | "never";
    public GroupDecision: boolean;
    public Count: number | string;
    public Emojis: string[] | null;
    public SpawnFrom: number;
    public PlaceHolder: string;
    public PlaceHolderLocals: {EN: string, UA: string, RU: string} | null = null;
    public ImageLink: string | null;
    public Description: string;



    //not finished
    public GetVoteRow(aliveUsers: MafiaUser[], unactive = false, owner: MafiaUser){
        if(this.ActionOnSelect=="no_activity")
            return null;
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        for (let user of aliveUsers){
                const chooser = new SelectMenuOptionBuilder()
                    .setLabel(user.dsUser.tag)
                    .setEmoji((this.Emojis)[Math.floor(Math.random() * this.Emojis.length)])
                    .setValue(user.id);
                chooseArr.push(chooser)
            }
        console.log(new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(this.RoleName + "_select")
                    .setPlaceholder(this.PlaceHolderLocals ? this.PlaceHolderLocals[owner.lang.toUpperCase() as keyof { EN: string, RU: string, UA: string }] : this.PlaceHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(unactive),
            ));
        return new ActionRowBuilder<SelectMenuBuilder>()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId(this.RoleName + "_select")
                        .setPlaceholder(this.PlaceHolderLocals ? this.PlaceHolderLocals[owner.lang.toUpperCase() as keyof { EN: string, RU: string, UA: string }] : this.PlaceHolder)
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addOptions(chooseArr)
                        .setDisabled(unactive),
                );
    }
}